import './Feedbacks.css';
import '../ProductView/ProductView.css';

export default function Feedbacks({ feeds, onStatusChange, cards }) {

  function handleStatusChange(e) {
    const { name, id } = e.target;
    const { product } = feeds.find((item) => item._id === id);

    const isApproved = name === 'confirm';
    onStatusChange(isApproved, product, id);
  }

  return(
    <section className="feed">
      <h2 className="feed__title">Отзывы</h2>
      <ul className="feed__list">
        {
          feeds?.filter((item) => !item.approved)?.map((item) =>
            <li className="feed__item" key={item._id}>
              <span className="feed__item-title">Отзыв к товару "{cards?.find((card) => card._id === item.product)?.name}"</span>
              { item.pluses &&
                <div className="product-view__comment-container comm_pad">
                  <span className="product-view__part-name">Достоинства</span>
                  <p className="product-view__comment">
                    {item.pluses}
                  </p>
                </div>
              }
              { item.minuses &&
                <div className="product-view__comment-container comm_pad">
                  <span className="product-view__part-name">Недостатки</span>
                  <p className="product-view__comment">{item.minuses}</p>
                </div>
              }
              { item.comment &&
                <div className="product-view__comment-container comm_pad">
                  <span className="product-view__part-name">Комментарий</span>
                  <p className="product-view__comment">{item.comment}</p>
                </div>
              }
              <div className="feed__btn-container">
                <button className="feed__ok-btn" name='confirm' id={item._id} type="button" onClick={handleStatusChange}>одобрить</button>
                <button className="feed__delete-btn" name='decline' id={item._id} type="button" onClick={handleStatusChange}>отклонить</button>
              </div>
            </li>
          )
        }
      </ul>
    </section>
  );
}
