"use client"
// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const defaultConfig = {
    shaderPoints: 8,
    curvePoints: 80,
    curveLerp: 0.75,
    radius1: 3,
    radius2: 5,
    velocityTreshold: 10,
    sleepRadiusX: 150,
    sleepRadiusY: 150,
    sleepTimeCoefX: 0.0025,
    sleepTimeCoefY: 0.0025,
};

interface NeonProps {
    width: number;
    height: number;
}

const Neon: React.FC<NeonProps> = ({ width, height }) => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const config = { ...defaultConfig };

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);

        mountRef.current.appendChild(renderer.domElement);

        const points = new Array(config.curvePoints).fill(0).map(() => new THREE.Vector2());
        const spline = new THREE.SplineCurve(points);

        const velocity = new THREE.Vector3();
        const velocityTarget = new THREE.Vector3();

        const uRatio = { value: new THREE.Vector2() };
        const uSize = { value: new THREE.Vector2() };
        const uPoints = {
            value: new Array(config.shaderPoints).fill(0).map(() => new THREE.Vector2()),
        };
        const uColor = { value: new THREE.Vector4(0.635294118, 0.325490196, 0.658823529, 1.0) }; // Initial RGBA color

        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            uniforms: { uRatio, uSize, uPoints, uColor },
            defines: {
                SHADER_POINTS: config.shaderPoints,
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
            fragmentShader: `
      float sdBezier(vec2 pos, vec2 A, vec2 B, vec2 C) {
        vec2 a = B - A;
        vec2 b = A - 2.0*B + C;
        vec2 c = a * 2.0;
        vec2 d = A - pos;
        float kk = 1.0 / dot(b,b);
        float kx = kk * dot(a,b);
        float ky = kk * (2.0*dot(a,a)+dot(d,b)) / 3.0;
        float kz = kk * dot(d,a);
        float res = 0.0;
        float p = ky - kx*kx;
        float p3 = p*p*p;
        float q = kx*(2.0*kx*kx - 3.0*ky) + kz;
        float h = q*q + 4.0*p3;
        if(h >= 0.0){
          h = sqrt(h);
          vec2 x = (vec2(h, -h) - q) / 2.0;
          vec2 uv = sign(x)*pow(abs(x), vec2(1.0/3.0));
          float t = uv.x + uv.y - kx;
          t = clamp( t, 0.0, 1.0 );
          vec2 qos = d + (c + b*t)*t;
          res = length(qos);
        } else {
          float z = sqrt(-p);
          float v = acos( q/(p*z*2.0) ) / 3.0;
          float m = cos(v);
          float n = sin(v)*1.732050808;
          vec3 t = vec3(m + m, -n - m, n - m) * z - kx;
          t = clamp( t, 0.0, 1.0 );
          vec2 qos = d + (c + b*t.x)*t.x;
          float dis = dot(qos,qos);
          res = dis;
          qos = d + (c + b*t.y)*t.y;
          dis = dot(qos,qos);
          res = min(res,dis);
          qos = d + (c + b*t.z)*t.z;
          dis = dot(qos,qos);
          res = min(res,dis);
          res = sqrt( res );
        }
        return res;
      }
    
      uniform vec2 uRatio;
      uniform vec2 uSize;
      uniform vec2 uPoints[SHADER_POINTS];
      uniform vec4 uColor; // RGBA color
      varying vec2 vUv;
      void main() {
        float intensity = 1.0;
        float radius = 0.015;
        vec2 pos = (vUv - 0.5) * uRatio;
        vec2 c = (uPoints[0] + uPoints[1]) / 2.0;
        vec2 c_prev;
        float dist = 10000.0;
        for(int i = 0; i < SHADER_POINTS - 1; i++){
          c_prev = c;
          c = (uPoints[i] + uPoints[i + 1]) / 2.0;
          dist = min(dist, sdBezier(pos, c_prev, uPoints[i], c));
        }
        dist = max(0.0, dist);
        float glow = pow(uSize.y / dist, intensity);
        vec4 col = vec4(0.0);
        col.rgb += 10.0 * vec3(smoothstep(uSize.x, 0.0, dist));
        col.rgb += glow * uColor.rgb;
        col = vec4(1.0 - exp(-col.rgb), uColor.a); // Apply alpha from uColor
        float alpha = smoothstep(0.0, 0.6, glow) * uColor.a; // Use the alpha from uColor
        col.a *= alpha; // Apply the computed alpha to col.a
        gl_FragColor = col;
      }
    `
            ,
            transparent: true,
        });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        let hover = false;

        const onResize = () => {
            renderer.setSize(width, height);
            uSize.value.set(config.radius1, config.radius2);
            if (width >= height) {
                uRatio.value.set(1, height / width);
                uSize.value.multiplyScalar(1 / width);
            } else {
                uRatio.value.set(width / height, 1);
                uSize.value.multiplyScalar(1 / height);
            }
        };

        const animate = () => {
            requestAnimationFrame(animate);

            for (let i = 1; i < config.curvePoints; i++) {
                points[i].lerp(points[i - 1], config.curveLerp);
            }
            for (let i = 0; i < config.shaderPoints; i++) {
                spline.getPoint(i / (config.shaderPoints - 1), uPoints.value[i]);
            }

            if (!hover) {
                const t1 = performance.now() * config.sleepTimeCoefX;
                const t2 = performance.now() * config.sleepTimeCoefY;
                const cos = Math.cos(t1);
                const sin = Math.sin(t2);
                const r1 = (config.sleepRadiusX * window.innerWidth) / width;
                const r2 = (config.sleepRadiusY * window.innerWidth) / width;
                const x = r1 * cos;
                const y = r2 * sin;
                spline.points[0].set(x, y);
                uColor.value.r = 0.5 + 0.5 * Math.cos(performance.now() * 0.0015);
                uColor.value.g = 0;
                uColor.value.b = 1 - uColor.value.r;
                uColor.value.a = 1.0; // Default alpha
            } else {
                uColor.value.r = velocity.z;
                uColor.value.g = 0;
                uColor.value.b = 1 - velocity.z;
                velocity.multiplyScalar(0.95);
            }

            renderer.render(scene, camera);
        };

        const onPointerMove = (event: PointerEvent) => {
            hover = true;
            const x = event.clientX / width - 0.5
            const y = -event.clientY / height + 0.5
            // const x = (event.clientX / (width*.5)) - 1;
            // const y = -(event.clientY / (height*.5)) + 1;
            console.log("MOVE", event.clientX, width, x)

            spline.points[0].set(x * uRatio.value.x, y * uRatio.value.y);

            const deltaX = Math.abs(event.movementX) / config.velocityTreshold;
            const deltaY = Math.abs(event.movementY) / config.velocityTreshold;
            velocityTarget.x = Math.min(velocity.x + deltaX, 1);
            velocityTarget.y = Math.min(velocity.y + deltaY, 1);
            velocityTarget.z = Math.sqrt(
                velocityTarget.x * velocityTarget.x + velocityTarget.y * velocityTarget.y
            );
            velocity.lerp(velocityTarget, 0.05);
        };



        const onPointerLeave = () => {
            hover = false;
        };

        mountRef.current.addEventListener('pointermove', onPointerMove);
        mountRef.current.addEventListener('pointerleave', onPointerLeave);

        onResize();
        animate();

        window.addEventListener('resize', onResize);

        return () => {
            mountRef.current?.removeChild(renderer.domElement);
            window.removeEventListener('resize', onResize);
            mountRef.current?.removeEventListener('pointermove', onPointerMove);
            mountRef.current?.removeEventListener('pointerleave', onPointerLeave);
        };
    }, [width, height]);

    return <div className='w-full h-full' ref={mountRef} style={{ width, height }} />;
};

export default Neon;
