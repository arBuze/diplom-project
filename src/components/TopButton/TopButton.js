import './TopButton.css';

export default function TopButton({ scroll, pathname }) {

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  return(
    <div className='cont'>
      <button className={`top-button ${scroll <= 250 ? 'hidden' : ''}`} type="button" onClick={scrollToTop} />
      {!pathname.includes('admin') && <a href="#showchat" className="top-button btn"  />}
    </div>
  );
};
