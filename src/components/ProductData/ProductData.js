import './ProductData.css';
import { useEffect, useState } from 'react';
import ProductForm from '../ProductForm/ProductForm';

export default function ProductData({ cards, pathname }) {
  const [currentCard, setCurrentCard] = useState({});


  useEffect(() => {
    const id = pathname.slice(pathname.lastIndexOf('/') + 1,);
    const card = cards.find((item) => item.id === Number(id));
    setCurrentCard(card);
  }, [])

  return(
    <section className="product-upd">
      <div className="product-upd__links-container">
        <ul className="product-upd__links-list">
          <li className="product-upd__item">
            <a className="product-upd__link" href='#name'>Название товара</a>
          </li>
          <li className="product-upd__item">
            <a className="product-upd__link" href='#price'>Цена товара</a>
          </li>
          {/* <li className="product-upd__item">
            <a className="product-upd__link" href='#sale'>Скидка на товар</a>
          </li> */}
          <li className="product-upd__item">
            <a className="product-upd__link" href='#category'>Категория товара</a>
          </li>
          <li className="product-upd__item">
            <a className="product-upd__link" href='#description'>Описание товара</a>
          </li>
          <li className="product-upd__item">
            <a className="product-upd__link" href='#chars'>Характеристики товара</a>
          </li>
          <li className="product-upd__item">
            <a className="product-upd__link" href='#images'>Изображения товара</a>
          </li>
        </ul>
      </div>
      <ProductForm pathname={pathname} productInfo={currentCard} />
    </section>
  );
}
