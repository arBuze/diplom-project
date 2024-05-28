import { Link } from 'react-router-dom';
import './BuildSection.css';
import { BASE_PROD_URL } from '../../utils/constants';

export default function BuildSection({ buildProducts, onBuild, onBuildConfirm, onBuildCancel }) {
  return (
    <div className="build-section">
      <label className="build-section__label">
        <input type="checkbox" className="build__check" onClick={onBuild} />
        сборка от нас + 2000 &#8381;
      </label>
      <ul className="build__decor-list list-section">
        <li className="build__decor-item dec">
          <Link className="build-section__link" to="/catalog/computer-cases">
            {
              buildProducts?.find((item) => item.category === 'computer-cases')
              ?
              <img className="build-section__img" crossOrigin='true' src={BASE_PROD_URL + buildProducts?.find((item) => item.category === 'computer-cases').images[0]} alt='' />
              :
              <span className="build-section__number">
                корпуса
              </span>
            }
          </Link>
        </li>
        <li className="build__decor-item dec">
          <Link className="build-section__link" to="/catalog/processors">
            {
              buildProducts?.find((item) => item.category === 'processors')
              ?
              <img className="build-section__img" crossOrigin='true' src={BASE_PROD_URL + buildProducts?.find((item) => item.category === 'processors').images[0]} alt='' />
              :
              <span className="build-section__number">
                процессоры
              </span>
            }
          </Link>
        </li>
        <li className="build__decor-item dec">
          <Link className="build-section__link" to="/catalog/motherboards">
            {
              buildProducts?.find((item) => item.category === 'motherboards')
              ?
              <img className="build-section__img" crossOrigin='true' src={BASE_PROD_URL + buildProducts?.find((item) => item.category === 'motherboards').images[0]} alt='' />
              :
              <span className="build-section__number">
                материнские платы
              </span>
            }
          </Link>
        </li>
        <li className="build__decor-item dec">
          <Link className="build-section__link" to="/catalog/video-cards">
            {
              buildProducts?.find((item) => item.category === 'video-cards')
              ?
              <img className="build-section__img" crossOrigin='true' src={BASE_PROD_URL + buildProducts?.find((item) => item.category === 'video-cards').images[0]} alt='' />
              :
              <span className="build-section__number">
                видеокарты
              </span>
            }
          </Link>
        </li>
        <li className="build__decor-item dec">
          <Link className="build-section__link" to="/catalog/coolers">
            {
              buildProducts?.find((item) => item.category === 'coolers')
              ?
              <img className="build-section__img" crossOrigin='true' src={BASE_PROD_URL + buildProducts?.find((item) => item.category === 'coolers').images[0]} alt='' />
              :
              <span className="build-section__number">
                кулеры
              </span>
            }
          </Link>
        </li>
        <li className="build__decor-item dec">
          <Link className="build-section__link" to="/catalog/rams">
            {
              buildProducts?.find((item) => item.category === 'rams')
              ?
              <img className="build-section__img" crossOrigin='true' src={BASE_PROD_URL + buildProducts?.find((item) => item.category === 'rams').images[0]} alt='' />
              :
              <span className="build-section__number">
                оперативная память
              </span>
            }
          </Link>
        </li>
        <li className="build__decor-item dec">
          <Link className="build-section__link" to="/catalog/power-units">
            {
              buildProducts?.find((item) => item.category === 'power-units')
              ?
              <img className="build-section__img" crossOrigin='true' src={BASE_PROD_URL + buildProducts?.find((item) => item.category === 'power-units').images[0]} alt='' />
              :
              <span className="build-section__number">
                блоки питания
              </span>
            }
          </Link>
        </li>
        <li className="build__decor-item dec">
          <Link className="build-section__link" to="/catalog/storages">
            {
              buildProducts?.find((item) => item.category === 'storages')
              ?
              <img className="build-section__img" crossOrigin='true' src={BASE_PROD_URL + buildProducts?.find((item) => item.category === 'storages').images[0]} alt='' />
              :
              <span className="build-section__number">
                хранение данных
              </span>
            }
          </Link>
        </li>
        <li className="build__decor-item dec">
          <Link className="build-section__link" to="/catalog/sound-boards">
            {
              buildProducts?.find((item) => item.category === 'sound-boards')
              ?
              <img className="build-section__img" crossOrigin='true' src={BASE_PROD_URL + buildProducts?.find((item) => item.category === 'sound-boards').images[0]} alt='' />
              :
              <span className="build-section__number">
                звуковые карты
              </span>
            }
          </Link>
        </li>
        <li className="build__decor-item dec">
          <Link className="build-section__link" to="/catalog/peripheral">
            {
              buildProducts?.find((item) => item.category === 'peripheral')
              ?
              <img className="build-section__img" crossOrigin='true' src={BASE_PROD_URL + buildProducts?.find((item) => item.category === 'peripheral').images[0]} alt='' />
              :
              <span className="build-section__number">
                периферия
              </span>
            }
          </Link>
        </li>
      </ul>
      <div className="build-section__btn-container">
        <button className="build-section__confirm-btn" type="button" onClick={onBuildConfirm} disabled={buildProducts.length < 10}>в корзину</button>
        <button className="build-section__cancel-btn" type="button" onClick={onBuildCancel}>отменить сборку</button>
      </div>
    </div>
  );
}
