import { RefObject, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";

interface Size {
  width: number;
  height: number;
}

export const useElementSize = <T extends keyof HTMLElementTagNameMap>(): [
  RefObject<HTMLElementTagNameMap[T]>,
  Size
] => {
  const ref = useRef<HTMLElementTagNameMap[T] | null>(null);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  useIsomorphicLayoutEffect(() => {
    const updateSize = (element: Element | null) => {
      // console.log("ELEMENT SIze", element)
      const { width, height } = element?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
      };
      setSize({ width, height });
    };

    updateSize(ref.current);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        updateSize(entry.target);
      }
    });

    ref.current && resizeObserver.observe(ref.current);
    return () => {
      ref.current && resizeObserver.unobserve(ref.current);
    };
  }, [ref.current]);

  return [ref, size];
};
