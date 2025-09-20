import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  triggerOnce?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export function useInView(options: UseInViewOptions = {}) {
  const { triggerOnce = false, threshold = 0.1, rootMargin = '0px' } = options;
  const [inView, setInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce || !hasTriggered) {
          setInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return { ref, inView };
}