import { useState, useEffect, useCallback } from "react";

type Options = {
  minResizeWidth?: number;
  maxResizeWidth?: number;
};

export default function useResizable(
  target: React.RefObject<HTMLElement>,
  resizer: React.RefObject<HTMLElement>,
  options?: Options
) {
  const [isResizing, setIsResizing] = useState(false);

  const resize: EventListenerOrEventListenerObject = useCallback((event) => {
    const targetElement = target.current;
    setIsResizing(true);

    if (targetElement) {
      const targetSize =
        event.pageX - targetElement.getBoundingClientRect().left;

      if (options?.minResizeWidth) {
        if (targetSize <= options.minResizeWidth) {
          targetElement.style.width = `${options.minResizeWidth}px`;
          return;
        }
      }

      if (options?.maxResizeWidth) {
        if (targetSize >= options.maxResizeWidth) {
          targetElement.style.width = `${options.maxResizeWidth}px`;
          return;
        }
      }

      targetElement.style.width = `${targetSize}px`;
    }
  }, []);

  const stopResize = useCallback(() => {
    setIsResizing(false);
    document.removeEventListener("mousemove", resize);
  }, []);

  const handleMouseDownEvent = useCallback(() => {
    document.addEventListener("mousemove", resize);
    resizer.current?.addEventListener("mouseup", stopResize);
  }, []);

  const handleMouseUp = useCallback(() => {
    stopResize();
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    resizer.current?.addEventListener("mousedown", handleMouseDownEvent);

    return () => {
      resizer.current?.removeEventListener("mousedown", handleMouseDownEvent);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return { isResizing };
}
