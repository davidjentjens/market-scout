// src/app/components/ui/EnsureVisibility.tsx
"use client";

import { useEffect } from 'react';

const EnsureVisibility = () => {
  useEffect(() => {
    // Ensure all reveal elements are visible regardless of scroll position
    const ensureVisible = () => {
      document.querySelectorAll('.scroll-reveal, .scroll-reveal-item').forEach(item => {
        if (!item.classList.contains('revealed')) {
          item.classList.add('revealed');
        }
      });
    };

    // Run on component mount and when user navigates back to the page
    ensureVisible();

    // Handle browser back/forward navigation
    window.addEventListener('pageshow', (event) => {
      // The persisted property is true if the page is cached and false if not
      if (event.persisted) {
        ensureVisible();
      }
    });

    return () => {
      window.removeEventListener('pageshow', ensureVisible);
    };
  }, []);

  return null;
};

export default EnsureVisibility;