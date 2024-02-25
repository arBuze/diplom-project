import { useEffect, useState } from 'react';
import './TopButton.css';

export default function TopButton() {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY || document.documentElement.scrollTop;
      scroll > 300 ? setIsHidden(false) : setIsHidden(true);
    })
  }, [])

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  return(
    <button className={`top-button ${isHidden ? 'hidden' : ''}`} type="button" onClick={scrollToTop} />
  );
};
