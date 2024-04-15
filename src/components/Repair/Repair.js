import { useState } from 'react';
import Breadcrumps from '../Breadcrumps/Breadcrumps';
import './Repair.css';
import { BASE_IMAGE_URL } from '../../utils/constants';

export default function Repair({ onRepairSubmit }) {
  const [formValues, setFormValues] = useState({});
  const [fileNames, setFileNames] = useState([]);
  const [fileDisabled, setFileDisabled] = useState(false);
  const url = 'http://localhost:3000/images';

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:3000/repair', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: formValues.description,
        contact: formValues.contact,
        fileNames,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then(res => {
      console.log(res);
      onRepairSubmit();
    })
    .catch(err => {
      console.log(err);
    })
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  function handleChange(e) {
    const form = document.querySelector('.repair__form');
    const formData = new FormData(form);
    const fetchOptions = {
      method: 'POST',
      body: formData,
    };
    setFileDisabled(true);
    fetch(url, fetchOptions)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then(res => {
        setFileNames([...fileNames, ...res.imageNames]);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setFileDisabled(false);
      });
  }

  function onDeletePhotoClick(e) {
    const { name } = e.target;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: name
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then(res => {
        console.log(res);
        setFileNames(fileNames.filter(item => !(item === name)));
      })
      .catch(err => {
        console.log(err);
      })
  }

  return(
    <section className="repair">
      <h2 className="repair__title">Ремонт</h2>
      <Breadcrumps />
      <div className="repair__container">
        <form className="repair__form" name="repair" encType="multipart/form-data" onSubmit={handleSubmit}>
          <ul className="repair__list">
            <li className="repair__form-item">
              <label className="repair__name" htmlFor='description'>
                Опишите проблему <span className="repair__required-input">*</span>
                </label>
              <textarea className="repair__input repair__input_type_description" id="description" name="description" autoComplete='off' required
                value={formValues?.description} onChange={handleInputChange} />
            </li>
            <li className="repair__form-item">
              <label className="repair__name" htmlFor='contact'>
                Контакты для связи <span className="repair__required-input">*</span>
                </label>
              {/* <p className="repair__contact-message">Контакты для связи будут взяты с вашего аккаунта</p> */}
              <input type="text" className="repair__input repair__input_type_contact" id="contact" name="contact" required
                value={formValues?.contact} onChange={handleInputChange} />
            </li>
            <li className="repair__form-item">
              <span className="repair__name">Приложите фото (максимум 10)</span>
              <div className="repair__input-container">
                <label className={`repair__file-cover ${fileDisabled ? 'disabled' : ''}`} htmlFor='images'>
                  <span className="repair__empty">выбрать файлы</span>
                </label>
                <input type="file" className="repair__input repair__input_type_images" name='images' id="images"
                  accept="image/png, image/jpeg, image/jpg" multiple onChange={handleChange}
                  disabled={fileDisabled} />
                {/* <span className="repair__selected-files">{fileNames}</span> */}
              </div>
            </li>
          </ul>
        </form>
        <ul className="repair__photo-list">
          {
            fileNames.map((item) =>
              <li className="repair__photo-item">
                <button className="repair__delete-btn" type="button" name={item} onClick={onDeletePhotoClick} />
                <img className="repair__photo" crossOrigin="true" src={BASE_IMAGE_URL + item} alt='' />
              </li>
            )
          }
        </ul>
        <button className="repair__submit-btn" form='repair' type="button" disabled={false} onClick={handleSubmit}>отправить заявку</button>
      </div>
    </section>
  );
}
