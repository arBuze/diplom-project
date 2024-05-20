import Breadcrumps from '../Breadcrumps/Breadcrumps';
import './SaleView.css';
import vcard from '../../images/photo-1520520688967-7bdc16e77dc2.jpg';
import ProductsList from '../ProductsList/ProductsList';
const title = 'Скидки на видеокарты MSI'

export default function SaleView({ cards, width, pathname, onLike, onCartAdd, faves, cart, onDislike, onCartRemove }) {
  return(
    <section className="sale-view">
      <h2 className="sale-view__title">{title}</h2>
      <Breadcrumps productName={title} />
      <div className="sale-view__container">
        <img className="sale-view__image" src={vcard} alt='' />
        <p className="sale-view__duration">Срок проведения: с 12 мая по 2 июня 2024</p>
        <h3 className="sale-view__list-title">Товары по акции</h3>
        <ProductsList cards={cards} width={width} pathname={pathname} display='grid'
          faves={faves} cart={cart}
          onLike={onLike} onDislike={onDislike}
          onCartAdd={onCartAdd} onCartRemove={onCartRemove} />
      </div>
    </section>
  );
}

