import './ProductForm.css';
import { useEffect, useState } from 'react';
import useFormValidation from '../../hooks/useFormValidation';
import { BASE_PROD_URL } from '../../utils/constants';
import { apir } from '../../utils/OperApi';

export default function ProductForm({ pathname, /* productInfo, */cards, onProductChange, onProductCreate, onProductDelete }) {
  const [productInfo, setProductInfo] = useState(null);
  const [fileNames, setFileNames] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [charError, setCharError] = useState({});
  const [isCharValid, setIsCharValid] = useState(true);
  const [fileDisabled, setFileDisabled] = useState(false);
  const { values, setValues, handleChange, errors, isValid, setIsValid, resetForm } = useFormValidation();

  useEffect(() => {
    reset();
    if (pathname.includes('products')) {
      const id = pathname.slice(pathname.lastIndexOf('/') + 1,);
      const card = cards.find((item) => item._id === id);
      setProductInfo(card);
      setIsValid(true);
    }
  }, [cards, pathname])

  useEffect(() => {
    if (productInfo) {
      infoSet();
    }
  }, [productInfo])

  useEffect(() => {
    const err = Object.values(charError).find((error) => error.name || error.value);
    console.log(err);
    if (err) {
      setIsCharValid(false);
    } else {
      setIsCharValid(true);
    }
  }, [charError])

  function infoSet() {
    const {
      name,
      category,
      images,
      characteristics,
      price,
      description,
      quantity,
      articule,
    } = productInfo;

    setValues({
      name,
      category,
      price,
      description,
      quantity,
      articule,
    });
    setFileNames([...images]);

    const arr = [];
    for (let i = 0; i < characteristics.length; i += 1) {
      arr.push({ id: i, name: characteristics[i].name, value: characteristics[i].value });
    }
    setCharacteristics(arr);
  }

  function reset() {
    setProductInfo(null);
    setValues({});
    setCharacteristics([]);
    setFileNames([]);
    setFileDisabled(false);
    setCharError({});
  }

  function resetClick() {
    setCharError({});
    setFileDisabled(false);
    setIsCharValid(true);
    if (pathname === '/admin/create-product') {
      resetForm();
      setCharacteristics([]);
      fileNames.forEach((file) => {
        handleFileDelete(file);
      });
    } else {
      const newImages = fileNames.filter((file) => !productInfo?.images.find((img) => img === file));
      newImages.forEach((img) => {
        handleFileDelete(img);
      })
      infoSet();
    }
  }

  function handleCharInputChange(e) {
    const { id, name, value } = e.target;
    let newChar = characteristics.find((char) => char.id === Number(id));

    if (name.includes('char-name')) {
      setCharError({
        ...charError,
        [id]: {
          ...charError[id],
          name: '',
        }
      });

      newChar.name = value;
      const sameName = characteristics.filter((char) => char.name === value);

      if (sameName.length > 1) {
        setCharError({
          ...charError,
          [id]: {
            ...charError[id],
            name: 'Характеристика с таким названием уже существует',
          }
        });
      }

      if (value === '') {
        setCharError({
          ...charError,
          [id]: {
            ...charError[id],
            name: 'Вы пропустили это поле',
          }
        });
      }
    } else {
      setCharError({
        ...charError,
        [id]: {
          ...charError[id],
          value: '',
        }
      });

      newChar.value = value;

      if (value === '') {
        setCharError({
          ...charError,
          [id]: {
            ...charError[id],
            value: 'Вы пропустили это поле',
          }
        });
      }
    }

    setCharacteristics(state => state.map((item) => item.id === newChar.id ? newChar : item));
  }

  function handleCharAdd() {
    if (characteristics.length === 0) {
      setCharacteristics([
        ...characteristics,
        {
          id: 0,
          name: '',
          value: '',
        }
      ]);
    } else {
      setCharacteristics([
        ...characteristics,
        {
          id: characteristics[characteristics.length - 1].id + 1,
          name: '',
          value: '',
        }
      ]);
    }
  }

  function handleCharDelete(e) {
    setCharacteristics(characteristics.filter((char) => !(char.id === Number(e.target.id))));
  }

  function handleFileChange() {
    const form = document.querySelector('.product-upd__form');
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

  function handleProductDelete() {
    fileNames.forEach((file) => {
      handleFileDelete(file);
    });
    onProductDelete(productInfo._id);
  }

  function handleSubmit() {
    const chars = characteristics.map((char) => ({ name: char.name, value: char.value }));
    console.log(chars);
    const { name, price, category, articule, quantity, description } = values;
    if (pathname === '/admin/create-product') {
      onProductCreate(name, description, Number(price), category, chars, fileNames, articule, Number(quantity));
    } else {
      onProductChange(productInfo._id, name, description, Number(price), category, chars, fileNames, articule, Number(quantity));
    }
  }

  return(
    <>
      <form className="product-upd__form" name="update">
        <h2 className="product-upd__form-title">{pathname === '/admin/create-product' ? 'Создание' : 'Изменение'} товара</h2>
        <label className="product-upd__label" id='name'>
          <span className="product-upd__field-name">Название</span>
          <input type="text" className="product-upd__input product-upd__input_name"
            name='name' value={values?.name} onChange={handleChange}
            required />
        </label>
        <span className="product-upd__error">{errors?.name}</span>
        <label className="product-upd__label" id='price'>
          <span className="product-upd__field-name">Цена (руб.)</span>
          <input type="number" className="product-upd__input product-upd__input_price"
            name='price' value={values?.price} onChange={handleChange}
            required />
        </label>
        <span className="product-upd__error">{errors?.price}</span>
        <label className="product-upd__label" id='articule'>
          <span className="product-upd__field-name">Артикул</span>
          <input type="text" className="product-upd__input product-upd__input_name"
            name='articule' value={values?.articule} onChange={handleChange}
            required />
        </label>
        <span className="product-upd__error">{errors?.articule}</span>
        <label className="product-upd__label" id='quantity'>
          <span className="product-upd__field-name">Количество (шт.)</span>
          <input type="number" className="product-upd__input product-upd__input_price"
            name='quantity' value={values?.quantity} onChange={handleChange}
            required />
        </label>
        <span className="product-upd__error">{errors?.quantity}</span>
        <fieldset className="product-upd__field" id='category'>
          <span className="product-upd__field-name">Категория</span>
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
        <label className="product-upd__label product-upd__label_desc" id='description'>
          <span className="product-upd__field-name">Описание</span>
          <textarea className="product-upd__input product-upd__input_description"
            name='description' value={values?.description} onChange={handleChange}
            required />
        </label>
        <span className="product-upd__error">{errors?.description}</span>
        <fieldset className="product-upd__field product-upd__field_chars" id='chars'>
          <span className="product-upd__field-name">Характеристики</span>
          <ul className="product-upd__chars-list">
            {
              characteristics.map((char) =>
                <li key={char.id} className="product-upd__char-item">
                  <div className="product-upd__char-container">
                    <div className="product-upd__input-btn-container">
                      <label className="product-upd__label">
                        Название
                        <input type="text" className="product-upd__input product-upd__input_char"
                          name={`char-name${char.id}`} value={char.name} onChange={handleCharInputChange} id={char.id}
                          required />
                      </label>
                      <span className="product-upd__error">{charError[String(char.id)]?.name}</span>
                    </div>
                    <div className="product-upd__input-btn-container">
                      <label className="product-upd__label">
                        Значение
                        <input type="text" className="product-upd__input product-upd__input_char"
                          name='char-value' value={char.value} onChange={handleCharInputChange} id={char.id}
                          required />
                      </label>
                      <span className="product-upd__error">{charError[String(char.id)]?.value}</span>
                    </div>
                  </div>
                  <button type="button" className="product-upd__delete-char-btn"
                    id={char.id} onClick={handleCharDelete} />
                  <span className="product-upd__title">удалить характеристику</span>
                </li>
              )
            }
          </ul>
          <button type="button" className="product-upd__add-btn" onClick={handleCharAdd}>Добавить новую характеристику</button>
        </fieldset>
        <fieldset className="product-upd__field">
          <label className="repair__file-cover" htmlFor='images'>
            <span className="repair__empty">выбрать файлы</span>
          </label>
          <input type="file" className="repair__input repair__input_type_images" name='images' id="images"
            accept="image/png, image/jpeg, image/jpg" multiple onChange={handleFileChange}
            disabled={fileDisabled} />
        </fieldset>
      </form>
      <ul className="repair__photo-list repair__photo-list_type_product">
        {
          fileNames?.map((item) =>
            <li className="repair__photo-item">
              <button className="repair__delete-btn" type="button" name={item} onClick={(e) => handleFileDelete(e.target.name)} />
              <img className="repair__photo" crossOrigin="true" src={BASE_PROD_URL + item} alt='' />
            </li>
          )
        }
      </ul>
      { pathname === '/admin/create-product'
        ? <div className="product-upd__btn-container">
            <button type="button" className="product-upd__create-btn"
              disabled={!isValid} onClick={handleSubmit} >
              Создать
            </button>
            <button type="button" className="product-upd__reset-btn" onClick={resetClick}>Сбросить</button>
          </div>
        : <div className="product-upd__btn-container">
            <button type="button" className="product-upd__save-btn"
              disabled={!isCharValid || !isValid} onClick={handleSubmit} >
              Сохранить
            </button>
            <button type="button" className="product-upd__reset-btn" onClick={resetClick}>Сбросить</button>
            <button type="button" className="product-upd__delete-btn" onClick={handleProductDelete}>Удалить товар</button>
          </div>
      }
    </>
  );
}
