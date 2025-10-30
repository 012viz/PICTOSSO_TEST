import { useEffect, useState } from 'react';

type UseSvgResult = {
  svgContent: string | null;
  fillColor: string;
  setFillColor: (color: string) => void;
};

function useSvg(svgUrl: string, initialFillColor: string = '#000000'): UseSvgResult {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [fillColor, setInternalFillColor] = useState<string>(initialFillColor);

  const setFillColor = (color: string) => {
    setInternalFillColor(color);
  };

  useEffect(() => {
    // Fetch the SVG content from the URL
    fetch(svgUrl)
      .then((response) => response.text())
      .then((data) => setSvgContent(data))
      .catch((error) => console.error('Error fetching SVG:', error));
  }, [svgUrl]);

  return {
    svgContent,
    fillColor,
    setFillColor,
  };
}

export default useSvg;
