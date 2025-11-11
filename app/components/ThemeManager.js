'use client'; // Ensures this is a client-side component

import { useEffect } from 'react';

export default function ThemeSwitcher() {
  useEffect(() => {
    // Add the 'dark' class to the html or body element
    document.documentElement.classList.add('dark');

    // Optional: Remove the 'dark' class when the component is unmounted
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  return null; // No UI is needed
}