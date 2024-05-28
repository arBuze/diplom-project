import { useState } from 'react';
import './PopupFeed.css';

export default function PopupFeed({ isOpened, onClose, onFeedAdd }) {
  const [values, setValues] = useState({});
  const [hoverValue, setHoverValue] = useState(0);

  function handleMouseOverRating(e) {
    const { id } = e.target;
    setHoverValue(Number(id));
  }

  function handleSetValue(e) {
    const { name, value } = e.target;
    if (name === 'rating') {
      setValues({
        ...values,
        [name]: Number(value),
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  }

  function handleMouseOut() {
    setHoverValue(0);
  }

  function handleFeedSend() {
    const { rating, pluses, minuses, comment } = values;
    onFeedAdd(rating, pluses, minuses, comment);
    handleClose();
  }

  function handleClose() {
    onClose();
    setValues({});
    setHoverValue(0);
  }

  return(
    <div className={`popup ${isOpened ? 'popup_opened' : ''}`}>
      <div className="popup__container popup-feed">
        <button className="popup__close-btn" onClick={handleClose} />
        <div className="popup-feed__rating-container">
          <span className="popup-feed__rating-name">Оценка:</span>
          <div class="rating-area">
          	<label className="rating__label">
              <input type="radio" className="rating__star" id="star-1" name="rating" value="1" checked={values.rating === 1} onChange={handleSetValue} />
              <span className={`rating__pseudo-star ${hoverValue >= 1 ? 'full' : (values?.rating >= 1 && hoverValue === 0) ? 'full' : ''}`} id="1" onMouseOver={handleMouseOverRating} onMouseOut={handleMouseOut} />
            </label>
            <label className="rating__label">
              <input type="radio" className="rating__star" id="star-2" name="rating" value="2" checked={values.rating === 2} onChange={handleSetValue} />
              <span className={`rating__pseudo-star ${hoverValue >= 2 ? 'full' : (values?.rating >= 2 && hoverValue === 0) ? 'full' : ''}`} id="2" onMouseOver={handleMouseOverRating} onMouseOut={handleMouseOut} />
            </label>
            <label className="rating__label">
              <input type="radio" className="rating__star" id="star-3" name="rating" value="3" checked={values.rating === 3} onChange={handleSetValue} />
              <span className={`rating__pseudo-star ${hoverValue >= 3 ? 'full' : (values?.rating >= 3 && hoverValue === 0) ? 'full' : ''}`} id="3" onMouseOver={handleMouseOverRating} onMouseOut={handleMouseOut} />
            </label>
            <label className="rating__label">
              <input type="radio" className="rating__star" id="star-4" name="rating" value="4" checked={values.rating === 4} onChange={handleSetValue} />
              <span className={`rating__pseudo-star ${hoverValue >= 4 ? 'full' : (values?.rating >= 4 && hoverValue === 0) ? 'full' : ''}`} id="4" onMouseOver={handleMouseOverRating} onMouseOut={handleMouseOut} />
            </label>
            <label className="rating__label">
              <input type="radio" className="rating__star" id="star-5" name="rating" value="5" checked={values.rating === 5} onChange={handleSetValue} />
              <span className={`rating__pseudo-star ${hoverValue >= 5 ? 'full' : (values?.rating >= 5 && hoverValue === 0) ? 'full' : ''}`} id="5" onMouseOver={handleMouseOverRating} onMouseOut={handleMouseOut} />
            </label>
          </div>
        </div>
        <label className="popup-feed__label">
          Достоинства:
          <textarea className="popup-feed__text" onChange={handleSetValue} name='pluses' value={values.pluses} />
        </label>
        <label className="popup-feed__label">
          Недостатки:
          <textarea className="popup-feed__text" onChange={handleSetValue} name='minuses' value={values.minuses} />
        </label>
        <label className="popup-feed__label">
          Комментарий:
          <textarea className="popup-feed__text" onChange={handleSetValue} name='comment' value={values.comment} />
        </label>
        <button className="popup-feed__send-btn" disabled={!values.rating} onClick={handleFeedSend}>отправить отзыв</button>
      </div>
    </div>
  );
}
