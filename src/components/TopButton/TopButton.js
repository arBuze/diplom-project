import './TopButton.css';

export default function TopButton({ scroll }) {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  return(
    <button className={`top-button ${scroll <= 250 ? 'hidden' : ''}`} type="button" onClick={scrollToTop} />
  );
};
