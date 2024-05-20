import './Feedbacks.css';
import '../ProductView/ProductView.css';

export default function Feedbacks({ feeds }) {
  return(
    <section className="feed">
      <h2 className="feed__title">Отзывы</h2>
      <ul className="feed__list">
        <li className="feed__item">
          <span className="feed__item-title">Отзыв к товару "Корпус DEXP DC-202M черный"</span>
          <div className="product-view__comment-container comm_pad">
            <span className="product-view__part-name">Достоинства</span>
            <p className="product-view__comment">
              Подойдет под длинную видеокарту, есть место для кабель менеджмента
            </p>
          </div>
          <div className="product-view__comment-container comm_pad">
            <span className="product-view__part-name">Недостатки</span>
            <p className="product-view__comment">Очень тонкий металл. Нет USB 3.0</p>
          </div>
          <div className="product-view__comment-container comm_pad">
            <span className="product-view__part-name">Комментарий</span>
            <p className="product-view__comment">Передняя панель фактурная - не маркая и не глянцевая, возле кнопок глянцевая вставка, кнопки и разъемы рабочие</p>
          </div>
          <div className="feed__btn-container">
            <button className="feed__ok-btn" type="button">одобрить</button>
            <button className="feed__delete-btn" type="button">отклонить</button>
          </div>
        </li>
      </ul>
    </section>
  );
}
