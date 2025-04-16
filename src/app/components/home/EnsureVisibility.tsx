import { useEffect } from 'react';

export function EnsureVisibility() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    const revealItems = document.querySelectorAll('.scroll-reveal-item');
    revealItems.forEach(item => {
      observer.observe(item);
    });
    
    // Scroll to top when navigating back to this page
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
    
    return () => {
      revealItems.forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);
  
  return null;
}