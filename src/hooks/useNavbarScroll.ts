import { useState, useEffect } from "react";

type NavScroll = { scrolled: boolean; hidden: boolean };

/**
 * `scrolled` once the page has moved past the threshold (solid nav background).
 * `hidden` while scrolling down past the first screen; the bar returns as soon
 * as the visitor scrolls up, so it never blocks content but stays one flick away.
 */
export function useNavbarScroll(threshold = 20): NavScroll {
  const [state, setState] = useState<NavScroll>({ scrolled: false, hidden: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      setState((s) => {
        const scrolled = y > threshold;
        let hidden = s.hidden;
        if (y < 140 || goingUp) hidden = false;
        else if (goingDown) hidden = true;
        return s.scrolled === scrolled && s.hidden === hidden ? s : { scrolled, hidden };
      });
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return state;
}
