import './PopupCreateSale.css';

export default function PopupCreateSale({ isOpened, onClose }) {
  return(
    <div className={`popup popup-pas ${false ? 'popup_opened' : ''}`}>
      <div className="popup-repair__container popup-pas__container">
        <label className="popup-sale__name">
          Название акции  <input type="date" />
        </label>
      </div>
    </div>
  );
}
