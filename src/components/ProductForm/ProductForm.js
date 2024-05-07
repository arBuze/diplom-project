import './ProductForm.css';
import { useEffect, useState } from 'react';
import useFormValidation from '../../hooks/useFormValidation';
import { BASE_PROD_URL } from '../../utils/constants';
import { apir } from '../../utils/OperApi';

export default function ProductForm({ pathname, productInfo, onProductChange, onProductCreate, onProductDelete }) {
  const [fileNames, setFileNames] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [fileDisabled, setFileDisabled] = useState(false);
  const { values, setValues, handleChange, errors, isValid } = useFormValidation();

  useEffect(() => {
    if (productInfo) {
      const {
        name,
        category,
        images,
        characteristics,
        price,
        descripton,
      } = productInfo;

      setValues({
        name,
        category,
        price,
        descripton,
      });
      setFileNames(images);

      const arr = [];
      for (let i = 0; i < characteristics.length; i += 1) {
        arr.push({ id: i, name: characteristics[i].name, value: characteristics[i].value });
      }
      setCharacteristics(characteristics);
    }
  }, [productInfo])

  function handleCharInputChange(e) {
    const { id, name, value } = e.target;
    let newChar = characteristics.find((char) => char.id === id);
    if (name === 'char-name') {
      newChar.name = value;
      setCharacteristics(state => state.map((item) => item.id === id ? newChar : item));
    } else {
      newChar.value = value;
      setCharacteristics(state => state.map((item) => item.id === id ? newChar : item));
    }
  }

  function handleCharAdd() {
    setCharacteristics([
      ...characteristics,
      {
        id: characteristics[characteristics.length - 1].id + 1,
        name: '',
        value: '',
      }
    ]);
  }

  function handleFileChange() {
    const form = document.querySelector('.repair__form');
    const formData = new FormData(form);
    setFileDisabled(true);

    apir.addProductPhoto(formData)
      .then((res) => {
        setFileNames([...fileNames, ...res.imageNames]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFileDisabled(false);
      });
  }

  function handleCharDelete(e) {
    setCharacteristics(characteristics.filter((char) => !(char.id === e.target.id)));
  }

  function handleFileDelete(name) {
    apir.deleteProductPhoto(name)
      .then((res) => {
        console.log(res.message);
        setFileNames(fileNames.filter(item => !(item === name)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit() {
    const chars = characteristics.map((char) => ({ name: char.name, value: char.value }));
    const { name, price, category, description } = values;
    if (pathname === '/oper/create-product') {
      onProductCreate(name, description, price, category, chars, fileNames);
    } else {
      onProductChange(productInfo.id, name, description, price, category, chars, fileNames);
    }
  }

  return(
    <>
      <form className="product-upd__form" name="update">
        <label className="product-upd__label" id='name'>
          Название
          <input type="text" className="product-upd__input product-upd__input_name"
            name='name' value={values.name} onChange={handleChange}
            required />
        </label>
        <span className="product-upd__error">{errors.name}</span>
        <label className="product-upd__label" id='price'>
          Цена
          <input type="number" className="product-upd__input product-upd__input_price"
            name='price' value={values.price} onChange={handleChange}
            required />
          <span className="product-upd__rubles">руб.</span>
        </label>
        <span className="product-upd__error">{errors.price}</span>
      {/* <label className="product-upd__label" id='sale'>
          Скидка
          <input type="number" className="product-upd__input product-upd__input_price"
            name='sale' value={values.sale} onChange={onInputChange} />
          <span className="product-upd__rubles">%</span>
        </label> */}
        <fieldset className="product-upd__field" id='category'>
          <span className="product-upd__filed-name">Категория</span>
          <div className="product-upd__categories">
            <label className="product-upd__label product-upd__label_radio">
              <input type="radio" className="product-upd__input product-upd__input_radio"
                name='category' value={'computer-cases'} onChange={handleChange}
                checked={values.category === 'computer-cases'} />
              <span className="product-upd__pseudo-radio">Корпуса</span>
            </label>
            <label className="product-upd__label product-upd__label_radio">
              <input type="radio" className="product-upd__input product-upd__input_radio"
                name='category' value={'processors'} onChange={handleChange}
                checked={values.category === 'processors'} />
              <span className="product-upd__pseudo-radio">Процессоры</span>
            </label>
            <label className="product-upd__label product-upd__label_radio">
              <input type="radio" className="product-upd__input product-upd__input_radio"
                name='category' value={'motherboards'} onChange={handleChange}
                checked={values.category === 'motherboards'} />
              <span className="product-upd__pseudo-radio">Материнские платы</span>
            </label>
            <label className="product-upd__label product-upd__label_radio">
              <input type="radio" className="product-upd__input product-upd__input_radio"
                name='category' value={'video-cards'} onChange={handleChange}
                checked={values.category === 'video-cards'} />
              <span className="product-upd__pseudo-radio">Видеокарты</span>
            </label>
            <label className="product-upd__label product-upd__label_radio">
              <input type="radio" className="product-upd__input product-upd__input_radio"
                name='category' value={'coolers'} onChange={handleChange}
                checked={values.category === 'coolers'} />
              <span className="product-upd__pseudo-radio">Кулеры</span>
            </label>
            <label className="product-upd__label product-upd__label_radio">
              <input type="radio" className="product-upd__input product-upd__input_radio"
                name='category' value={'rams'} onChange={handleChange}
                checked={values.category === 'rams'} />
              <span className="product-upd__pseudo-radio">Оперативная память</span>
            </label>
            <label className="product-upd__label product-upd__label_radio">
              <input type="radio" className="product-upd__input product-upd__input_radio"
                name='category' value={'power-units'} onChange={handleChange}
                checked={values.category === 'power-units'} />
              <span className="product-upd__pseudo-radio">Блок питания</span>
            </label>
            <label className="product-upd__label product-upd__label_radio">
              <input type="radio" className="product-upd__input product-upd__input_radio"
                name='category' value={'storages'} onChange={handleChange}
                checked={values.category === 'storages'} />
              <span className="product-upd__pseudo-radio">Хранение данных</span>
            </label>
            <label className="product-upd__label product-upd__label_radio">
              <input type="radio" className="product-upd__input product-upd__input_radio"
                name='category' value={'sound-boards'} onChange={handleChange}
                checked={values.category === 'sound-boards'} />
              <span className="product-upd__pseudo-radio">Звуковые карты</span>
            </label>
            <label className="product-upd__label product-upd__label_radio">
              <input type="radio" className="product-upd__input product-upd__input_radio"
                name='category' value={'peripheral'} onChange={handleChange}
                checked={values.category === 'peripheral'} />
              <span className="product-upd__pseudo-radio">Периферия</span>
            </label>
          </div>
        </fieldset>
        <label className="product-upd__label" id='description'>
          Описание
          <textarea className="product-upd__input product-upd__input_description"
            name='description' value={values.description} onChange={handleChange}
            required />
        </label>
        <span className="product-upd__error">{errors.description}</span>
        <fieldset className="product-upd__field product-upd__field_chars" id='chars'>
          <span className="product-upd__filed-name">Характеристики</span>
          <ul className="product-upd__chars-list">
            {
              characteristics.map((char) =>
                <li className="product-upd__char-item">
                  <div className="product-upd__char-container">
                    <label className="product-upd__label">
                      Название
                      <input type="text" className="product-upd__input product-upd__input_char"
                        name='char-name' value={char.name} onChange={handleCharInputChange} id={char.id}
                        required />
                      <span className="product-upd__error"></span>
                    </label>
                    <label className="product-upd__label">
                      Значение
                      <input type="text" className="product-upd__input product-upd__input_char"
                        name='char-value' value={char.value} onChange={handleCharInputChange} id={char.id}
                        required />
                      <span className="product-upd__error"></span>
                    </label>
                  </div>
                  <button type="button" className="product-upd__delete-char-btn" title='Удалить характеристику'
                    id={char.id} onClick={handleCharDelete} />
                </li>
              )
            }
          </ul>
          <button type="button" className="product-upd__add-btn" onClick={handleCharAdd}>Добавить новую характеристику</button>
        </fieldset>
        <fieldset className="">
        <label className="repair__file-cover" htmlFor='images'>
          <span className="repair__empty">выбрать файлы</span>
        </label>
        <input type="file" className="repair__input repair__input_type_images" name='images' id="images"
          accept="image/png, image/jpeg, image/jpg" multiple onChange={handleFileChange}
          disabled={fileDisabled} />
        </fieldset>
      </form>
      <ul className="repair__photo-list">
        {
          fileNames.map((item) =>
            <li className="repair__photo-item">
              <button className="repair__delete-btn" type="button" name={item} onClick={(e) => handleFileDelete(e.target.name)} />
              <img className="repair__photo" crossOrigin="true" src={BASE_PROD_URL + item} alt='' />
            </li>
          )
        }
      </ul>
      { pathname === '/oper/create-product'
        ? <button type="button" className="product-upd__create-btn"
            disabled={!isValid} onClick={handleSubmit} >
            Создать
          </button>
        : <div className="product-upd__btn-container">
            <button type="button" className="product-upd__save-btn"
              disabled={!isValid} onClick={handleSubmit} >
              Сохранить
            </button>
            <button type="button" className="product-upd__delete-btn" onClick={onProductDelete}>удалить товар</button>
          </div>
      }
    </>
  );
}
