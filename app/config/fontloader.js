'use client'

import { useEffect } from 'react';

export default function FontAwesomeLoader() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    link.as = 'style';
    link.onload = () => {
      link.rel = 'stylesheet'; // Ensure rel is set after loading
    };
    document.head.appendChild(link)
;
  }, []);

  return null;
}