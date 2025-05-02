"use client";

import React from 'react';
import { useEffect } from 'react';

const ThemeSwitcher = () => {
  useEffect(() => {
    // Select the theme toggle checkbox
    const themeToggle = document.getElementById('theme-toggle');

    // Check the current theme from localStorage (if set)
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-theme');
      themeToggle.checked = true; // Make sure the toggle is in the correct position
    }

    // Event listener to toggle themes
    themeToggle.addEventListener('change', function () {
      if (themeToggle.checked) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark'); // Save the dark theme preference
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light'); // Save the light theme preference
      }
    });

    // Cleanup the event listener on component unmount
    return () => {
      themeToggle.removeEventListener('change', () => {});
    };
  }, []);

  return (
    <div className="theme-switcher">
      <label className="switch">
        <input type="checkbox" id="theme-toggle" />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;

