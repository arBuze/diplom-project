import Breadcrumps from '../Breadcrumps/Breadcrumps';
import ProductsList from '../ProductsList/ProductsList';
import './ComputerCases.css';

export default function ComputerCases() {
  return(
    <section className="computer-cases">
      <h2 className="computer-cases__title">Корпуса</h2>
      <Breadcrumps />
      <div className="computer-cases__filters-container">
        <div className="computer-cases__container">
          <button className="computer-cases__list-btn" type="button">Фильтры</button>
          <button className="computer-cases__reverse-btn" type="button" />
        </div>
        <div className="computer-cases__container">
          <button className="computer-cases__cell-view-btn" name="cell" type="button" />
          <button className="computer-cases__line-view-btn" name="line" type="button" />
        </div>
      </div>
      <ProductsList />
    </section>
  );
};
