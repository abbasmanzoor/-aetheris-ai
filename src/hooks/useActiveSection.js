import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds, offset = 100) => {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const observers = [];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: `-${offset}px 0px -${offset}px 0px`,
      threshold: 0.3,
    });

    sectionElements.forEach((el) => {
      if (el) {
        observer.observe(el);
        observers.push({ el, observer });
      }
    });

    return () => {
      observers.forEach(({ el, observer }) => {
        if (el) observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, [sectionIds, offset]);

  return activeId;
};