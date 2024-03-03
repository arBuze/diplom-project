import Breadcrumps from '../Breadcrumps/Breadcrumps';
import './ProductView.css';
import { cards } from '../../utils/constants';

export default function ProductView() {
  return(
    <section className="product-view">
      <Breadcrumps productName='Aboba' />
      <div className="product-view__container">
        
      </div>
    </section>
  )
}
