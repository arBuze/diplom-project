import './ProductsList.css';
import ProductCard from '../ProductCard';
import { cards } from '../../utils/constants';

export default function ProductsList() {
  return(
    <ul className="products-list">
      {
        cards.map((item) => {
          return(<ProductCard key={item.id} card={item} />)
        })
      }
    </ul>
  );
};
