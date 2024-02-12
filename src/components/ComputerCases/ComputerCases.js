import Breadcrumps from '../Breadcrumps/Breadcrumps';
import ProductsList from '../ProductsList/ProductsList';
import './ComputerCases.css';

export default function ComputerCases() {
  return(
    <section className="computer-cases">
      <h2 className="computer-cases__title">Корпуса</h2>
      <Breadcrumps />
      <ProductsList />
    </section>
  );
};
