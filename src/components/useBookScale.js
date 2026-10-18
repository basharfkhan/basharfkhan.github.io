import { useLayoutEffect, useState } from "react";

/*
  The flipbook renders at a fixed ~1200x764 regardless of the window, so on a
  1280x720 or 1366x768 laptop the spread overflows and the Previous/Next
  controls fall below the fold. Rather than resize the flipbook itself, which
  would re-initialise it and throw the reader back to page one, we scale the
  whole stage with a transform and give its wrapper the scaled height so the
  surrounding layout stays honest.
*/

const MAX_SCALE = 1.2;  // grows on a 1440p monitor, where the book otherwise looks lost
const MIN_SCALE = 0.6;  // below this the type is too small to be worth fitting

export function useBookScale(stageRef, navRef, controlsRef) {
  const [scale, setScale] = useState(1);

  // The height the wrapper should occupy once the book is scaled. A transform
  // does not shrink the layout box, so without this the full-size box keeps
  // generating page scroll. The scaled element is positioned absolutely, which
  // is what stops this height feeding back into the flipbook: it is
  // size="stretch", so a constrained ancestor makes it re-stretch smaller,
  // which changes the measurement, which changes the scale again.
  const [fitHeight, setFitHeight] = useState(null);

  useLayoutEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      if (!stage) return;

      // The stage is inside the scaled wrapper, so its own box is always the
      // unscaled size. That is exactly what we want to scale against.
      const naturalWidth = stage.offsetWidth;
      const naturalHeight = stage.offsetHeight;
      if (!naturalWidth || !naturalHeight) return;

      const chrome =
        (navRef.current?.offsetHeight ?? 0) +
        (controlsRef.current?.offsetHeight ?? 0);

      // Margins and padding around the book that the two measurements above
      // do not cover: .desktop-book padding, plus the nav and control margins.
      const spacing = 30 + 24 + 22 + 38;

      // 2px of slack: the nav and controls report fractional heights, which
      // round up against the viewport and leave the page scrollable by a pixel.
      const availableHeight = window.innerHeight - chrome - spacing - 2;
      const availableWidth = window.innerWidth * 0.94;

      const next = Math.min(
        availableHeight / naturalHeight,
        availableWidth / naturalWidth,
        MAX_SCALE
      );

      const clamped = Math.max(MIN_SCALE, Math.min(next, MAX_SCALE));
      setScale(clamped);
      // Floored: a fractional height rounds up against the viewport and leaves
      // the page scrollable by a pixel.
      setFitHeight(Math.floor(naturalHeight * clamped));
    };

    measure();

    window.addEventListener("resize", measure);

    // The flipbook settles its height after init, so a one-off measure on
    // mount reads the wrong number.
    const observer = new ResizeObserver(measure);
    if (stageRef.current) observer.observe(stageRef.current);

    return () => {
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, [stageRef, navRef, controlsRef]);

  return { scale, fitHeight };
}
