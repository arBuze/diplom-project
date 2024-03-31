import Breadcrumps from '../Breadcrumps/Breadcrumps';
import './SaleView.css';
import comp from '../../images/giorgio-trovato-v_bri4iVuiM-unsplash.jpg';
import ProductsList from '../ProductsList/ProductsList';
const title = 'Скидки на корпуса 1233452'

export default function SaleView({ cards, width, pathname }) {
  return(
    <section className="sale-view">
      <h2 className="sale-view__title">{title}</h2>
      <Breadcrumps productName={title} />
      <div className="sale-view__container">
        <img className="sale-view__image" src={comp} alt='' />
        <p className="sale-view__duration">Срок проведения: с 12 марта по 12 апреля 2024</p>
        <h3 className="sale-view__list-title">Товары по акции</h3>
        <ProductsList cards={cards} width={width} pathname={pathname} display='grid' />
      </div>
    </section>
  );
}

