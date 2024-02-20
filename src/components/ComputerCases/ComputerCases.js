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
          <select className="computer-cases__filter-select">
            <option className="computer-cases__filter-option">По цене</option>
            <option className="computer-cases__filter-option">По рейтингу</option>
            <option className="computer-cases__filter-option">По скидке</option>
          </select>
          <button className="computer-cases__reverse-btn" type="button" />
        </div>
        <div className="computer-cases__container">
          <button className="computer-cases__cell-view-btn" name="cell" type="button" />
          <button className="computer-cases__line-view-btn" name="line" type="button" />
        </div>
      </div>
      <div className="computer-cases__container">
        <div className="computer-cases__filters">
          <fieldset className="computer-cases__price" name="price">
            <div className="computer-cases__filter-name">
              <span className="computer-cases__filter-title">Цена</span>
              <button className="computer-cases__hide-btn" type="button" />
            </div>
            <div className="computer-cases__filter">
              
            </div>
          </fieldset>
        </div>
        <ProductsList />
      </div>
    </section>
  );
};
