"use client";

// components/ScrollTriggerComponent.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerComponent = ({
  children,
  start = "top 80%", // Start trigger position
  end = "bottom 20%", // End trigger position
  animationProps = { opacity: 1, y: 0 }, // Default animation
  initialProps = { opacity: 0, y: 50 }, // Initial state
  triggerHook, // For custom trigger (optional)
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const animation = gsap.fromTo(
      elementRef.current,
      initialProps,
      {
        ...animationProps,
        scrollTrigger: {
          trigger: triggerHook || elementRef.current,
          start,
          end,
          scrub: true, // Optional, for smooth animation
          markers: false, // Set to true to debug triggers
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill(); // Clean up animation on unmount
      animation.kill(); // Clean up animation itself
    };
  }, [start, end, animationProps, initialProps, triggerHook]);

  return (
    <div ref={elementRef} style={{ position: "relative" }}>
      {children}
    </div>
  );
};

export default ScrollTriggerComponent;

