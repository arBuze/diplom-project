import Breadcrumps from '../Breadcrumps/Breadcrumps';
import './Repair.css';

export default function Repair() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return(
    <section className="repair">
      <h2 className="repair__title">Ремонт</h2>
      <Breadcrumps />
      <div className="repair__container">
        <form className="repair__form" name="repair" onSubmit={handleSubmit}>
          
          <button className="repair__submit-btn">Отправить</button>
        </form>
      </div>
    </section>
  );
}
