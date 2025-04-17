// src/app/components/ui/ScrollReveal.tsx
"use client";

import { useEffect } from "react";

const ScrollReveal = () => {
  useEffect(() => {
    // Function to initialize and set up observers
    const initScrollReveal = () => {
      // First, handle any elements that might already be in viewport
      const revealItems = document.querySelectorAll(
        ".scroll-reveal, .scroll-reveal-item",
      );

      // Check if any items are already in viewport on page load/return
      revealItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          item.classList.add("revealed");
        }
      });

      // Then set up observer for remaining elements
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.1,
        },
      );

      // Observe only elements that haven't been revealed yet
      revealItems.forEach((item) => {
        if (!item.classList.contains("revealed")) {
          observer.observe(item);
        }
      });

      return observer;
    };

    // Initialize the scroll reveal
    const observer = initScrollReveal();

    // Handle page visibility changes (e.g., when user returns to the tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Reinitialize scroll reveal when page becomes visible again
        const revealItems = document.querySelectorAll(
          ".scroll-reveal, .scroll-reveal-item",
        );
        revealItems.forEach((item) => {
          const rect = item.getBoundingClientRect();
          if (rect.top <= window.innerHeight) {
            item.classList.add("revealed");
          }
        });
      }
    };

    // Listen for visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Also handle navigation events using popstate
    const handlePopState = () => {
      // Short timeout to ensure DOM is updated
      setTimeout(() => {
        initScrollReveal();
      }, 100);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      if (observer) {
        document
          .querySelectorAll(".scroll-reveal, .scroll-reveal-item")
          .forEach((item) => {
            observer.unobserve(item);
          });
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
};

export default ScrollReveal;
