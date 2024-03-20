import { useEffect } from "react";
import { throttle } from "lodash";

export const useInfiniteScroll = (callback: () => void) => {
  useEffect(() => {
    const throttledCallback = throttle(callback, 200);

    window.addEventListener("scroll", throttledCallback);
    return () => window.removeEventListener("scroll", throttledCallback);
  }, [callback]);
};
