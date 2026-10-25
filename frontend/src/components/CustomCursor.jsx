import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    // 1. Detect if touch device or coarse pointer (mobile / tablet)
    const isTouch = window.matchMedia('(pointer: coarse)').matches ||
                    !window.matchMedia('(hover: hover)').matches ||
                    ('ontouchstart' in window && window.innerWidth < 1024);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Do not activate on mobile, touch screens, or if reduced motion is requested
    if (isTouch || prefersReducedMotion) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Enable custom cursor active class on body to hide standard cursor
    document.body.classList.add('custom-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let isVisible = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      // Immediately translate the small crimson dot with hardware acceleration
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;

      // Check if hovering over clickable / interactive elements
      const target = e.target;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, .project-media, .interactive-card, .group\\/img')
        );
        isHovered = isInteractive;
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    // Smooth RAF loop for the trailing outer ring
    const render = () => {
      // Lerp outer ring toward mouse position (0.16 smoothing factor)
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      const scale = isHovered ? 1.5 : 1;
      ring.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0) scale(${scale})`;

      if (isHovered) {
        ring.style.borderColor = 'rgba(155, 75, 82, 0.7)';
        ring.style.backgroundColor = 'rgba(155, 75, 82, 0.08)';
      } else {
        ring.style.borderColor = 'rgba(214, 196, 181, 0.8)';
        ring.style.backgroundColor = 'transparent';
      }

      rafId.current = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    rafId.current = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <>
      {/* Small Crimson Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#9B4B52] pointer-events-none z-[99999] opacity-0 transition-opacity duration-200 shadow-[0_0_8px_rgba(155,75,82,0.7)] will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />

      {/* Larger Smoothly Trailing Outer Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-[#D6C4B5] pointer-events-none z-[99998] opacity-0 transition-[border-color,background-color,opacity] duration-200 will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </>
  );
}
