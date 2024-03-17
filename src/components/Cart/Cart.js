import Breadcrumps from '../Breadcrumps/Breadcrumps';
import './Cart.css';

export default function Cart() {
  return(
    <section className="cart">
      <h2 className="cart__title">Корзина</h2>
      <Breadcrumps />
      <div className="cart__container">
        
      </div>
    </section>
  );
}
