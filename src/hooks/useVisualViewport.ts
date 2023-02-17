import { useEffect, useState } from "react";

export function useVisualViewport() {
  const [height, setHeight] = useState(
    typeof window !== "undefined" && window?.visualViewport?.height
      ? window.visualViewport.height
      : 0
  );
  const [width, setWidth] = useState(
    typeof window !== "undefined" && window?.visualViewport?.width
      ? window.visualViewport.width
      : 0
  );

  const handler = (event: any) => {
    setHeight(event.target.height);
    setWidth(event.target.width);
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window?.visualViewport?.addEventListener("resize", handler);
    window?.visualViewport?.addEventListener("scroll", handler);

    return () => {
      if (typeof window === "undefined") {
        return;
      }
      window?.visualViewport?.removeEventListener("resize", handler);
      window?.visualViewport?.removeEventListener("scroll", handler);
    };
  }, []);

  return { height, width };
}
