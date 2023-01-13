import { useState } from "react";

export const useReloadPic = (pic: string) => {
  const [img, setImg] = useState(pic);
  const [fallback, setFallback] = useState(false);
  const reloadSrc = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (fallback) {
      if (e.target instanceof HTMLImageElement) e.target.src = pic;
    } else {
      if (e.target instanceof HTMLImageElement) e.target.src = img;
      setFallback(true);
    }
  };
  return { img, reloadSrc };
};
