import { useState } from 'react';
import Breadcrumps from '../Breadcrumps/Breadcrumps';
import './Repair.css';

export default function Repair({ onRepairSubmit }) {
  const [fileNames, setFileNames] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onRepairSubmit();
  }

  function handleChange(e) {
    console.log(e.target.files, e.target.files.length);
    let text = [];
    for (let i = 0; i < e.target.files.length; i += 1) {
      text.push(e.target.files[i].name);
    }
    setFileNames(text.join(', '));
  }

  return(
    <section className="repair">
      <h2 className="repair__title">Ремонт</h2>
      <Breadcrumps />
      <div className="repair__container">
        <form className="repair__form" name="repair" onSubmit={handleSubmit}>
          <ul className="repair__list">
            <li className="repair__form-item">
              <label className="repair__name" htmlFor='description'>
                Опишите проблему <span className="repair__required-input">*</span>
                </label>
              <textarea className="repair__input repair__input_type_description" id="description" autoComplete='off' required />
            </li>
            <li className="repair__form-item">
              <span className="repair__name">Приложите фото</span>
              <div className="repair__input-container">
                <label className="repair__file-cover" htmlFor='images'>
                  <span className="repair__empty">выбрать файлы</span>
                </label>
                <input type="file" className="repair__input repair__input_type_images" id="images"
                  accept="image/png, image/jpeg, image/jpg" multiple onChange={handleChange} />
                <span className="repair__selected-files">{fileNames}</span>
              </div>
            </li>
            <li className="repair__form-item">
              <label className="repair__name" htmlFor='contact'>
                Контакты для связи <span className="repair__required-input">*</span>
                </label>
              {/* <p className="repair__contact-message">Контакты для связи будут взяты с вашего аккаунта</p> */}
              <input type="text" className="repair__input repair__input_type_contact" id="contact" required />
            </li>
          </ul>
          <button className="repair__submit-btn" type="submit" disabled={false}>отправить заявку</button>
        </form>
      </div>
    </section>
  );
}
