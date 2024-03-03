import { useState, useEffect } from 'react';

function getScroll() {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  return scrollY;
}

export default function useVerticalScroll() {
  const [scroll, setScroll] = useState(getScroll());

  useEffect(() => {
    function handleScroll() {
      setScroll(getScroll());
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scroll;
}
