import Breadcrumps from '../Breadcrumps/Breadcrumps';
import './Build.css';

export default function Build({ onBuildStart, onBuild, toBuild }) {
  return(
    <section className="build">
      <h2 className="build__title">Сборка</h2>
      <Breadcrumps />
      <div className="build__container">
        <div className="build__start-container">
          <div className="build__input-container">
            <button className="build__start-btn" type="button" onClick={onBuildStart}>начать сборку</button>
            <label className="build__label">
              <input type="checkbox" className="build__check" checked={toBuild} onClick={onBuild} />
              сборка от нас + 2000 &#8381;
            </label>
          </div>
          <ul className="build__decor-list">
            <li className="build__decor-item"></li>
            <li className="build__decor-item"></li>
            <li className="build__decor-item"></li>
            <li className="build__decor-item"></li>
            <li className="build__decor-item"></li>
            <li className="build__decor-item"></li>
            <li className="build__decor-item"></li>
            <li className="build__decor-item"></li>
            <li className="build__decor-item"></li>
            <li className="build__decor-item"></li>
          </ul>
        </div>
        <p className="build__text build__text_title">Пройдите всего несколько шагов, чтобы собрать свой персональный компьютер.</p>
        <p className="build__text">На каждом шагу выберите понравившийся товар из соответствующей категории, который затем попадет в сборку. В любой момент вы можете изменить свой выбор.</p>
        <p className="build__text">После выбора всех комплектующих, выбранные товары попадут в вашу корзину.</p>
      </div>
    </section>
  );
}

