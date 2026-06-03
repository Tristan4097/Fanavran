import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const {
    threshold = 0.2,
    y = 30,
    x = 0,
    duration = 600,
    delay = 0,
    stagger = 0,
    once = true,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }

    const children = stagger > 0 ? Array.from(element.children) as HTMLElement[] : [element];

    children.forEach((child, i) => {
      child.style.opacity = '0';
      child.style.transform = `translate(${x}px, ${y}px)`;
      child.style.transition = `opacity ${duration}ms cubic-bezier(0, 0, 0.2, 1) ${delay + i * stagger}ms, transform ${duration}ms cubic-bezier(0, 0, 0.2, 1) ${delay + i * stagger}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child) => {
              child.style.opacity = '1';
              child.style.transform = 'translate(0, 0)';
            });
            if (once) observer.unobserve(element);
          } else if (!once) {
            children.forEach((child) => {
              child.style.opacity = '0';
              child.style.transform = `translate(${x}px, ${y}px)`;
            });
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, y, x, duration, delay, stagger, once]);

  return ref;
}
