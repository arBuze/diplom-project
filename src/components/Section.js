/* import oneComp from '../images/one-computer.jpg'; */
import ProductCard from "./ProductCard";
import { cards } from "../utils/constants";

export default function Section(props) {
  return(
    <section className="new-products">
        {/* <div className="new-products__decor"> */}
          <h2 className="new-products__title">Новинки</h2>
       {/*  </div> */}
        <div className="new-products__show">
          <ul className="new-products__list">
            {
              cards.map((item) => {
                return(<ProductCard key={item.id} card={item} />)
              })
            }


            {/* <li className="new-products__product-card">
              <div className="new-products__img-container">
                <img className="new-products__product-img" src={oneComp} alt="" />
                <button className="new-products__like" type="button"></button>
                <ul className="new-products__rating">
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                </ul>
              </div>
              <div className="new-products__info">
                <h3 className="new-products__name">Корпус 12-1242 2452 54452 13546 225235 624624523</h3>
                <span className="new-products__cost">1200 руб.</span>
                <span className="new-products__cost last-cost">1100 rub</span>
                <form className="new-products__add-form" name="add-to-cart">
                  <button className="new-products__add-btn" type="submit"></button>
                  <div className="new-products__add-multiple">
                    <button className="new-products__decrease-btn" type="submit">-</button>
                    <span className="new-products__quantity">1</span>
                    <button className="new-products__increase-btn" type="submit">+</button>
                  </div>
                </form>
              </div>
            </li>
            <li className="new-products__product-card">
              <div className="new-products__img-container">
                <img className="new-products__product-img" src={oneComp} alt="" />
                <button className="new-products__like" type="button"></button>
                <ul className="new-products__rating">
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                </ul>
              </div>
              <div className="new-products__info">
                <h3 className="new-products__name">Корпус 12-1242 2452 54452 13546 225235 624624523</h3>
                <span className="new-products__cost">1200 руб.</span>
                <span className="new-products__cost last-cost">1100 rub</span>
                <form className="new-products__add-form" name="add-to-cart">
                  <button className="new-products__add-btn" type="submit"></button>
                  <div className="new-products__add-multiple">
                    <button className="new-products__decrease-btn" type="submit">-</button>
                    <span className="new-products__quantity">1</span>
                    <button className="new-products__increase-btn" type="submit">+</button>
                  </div>
                </form>
              </div>
            </li>
            <li className="new-products__product-card">
              <div className="new-products__img-container">
                <img className="new-products__product-img" src={oneComp} alt="" />
                <button className="new-products__like" type="button"></button>
                <ul className="new-products__rating">
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                </ul>
              </div>
              <div className="new-products__info">
                <h3 className="new-products__name">Корпус 12-1242 2452 54452 13546 225235 624624523</h3>
                <span className="new-products__cost">1200 руб.</span>
                <span className="new-products__cost last-cost">1100 rub</span>
                <form className="new-products__add-form" name="add-to-cart">
                  <button className="new-products__add-btn" type="submit"></button>
                  <div className="new-products__add-multiple">
                    <button className="new-products__decrease-btn" type="submit">-</button>
                    <span className="new-products__quantity">1</span>
                    <button className="new-products__increase-btn" type="submit">+</button>
                  </div>
                </form>
              </div>
            </li>
            <li className="new-products__product-card">
              <div className="new-products__img-container">
                <img className="new-products__product-img" src={oneComp} alt="" />
                <button className="new-products__like" type="button"></button>
                <ul className="new-products__rating">
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                </ul>
              </div>
              <div className="new-products__info">
                <h3 className="new-products__name">Корпус 12-1242 2452 54452 13546 225235 624624523</h3>
                <span className="new-products__cost">1200 руб.</span>
                <span className="new-products__cost last-cost">1100 rub</span>
                <form className="new-products__add-form" name="add-to-cart">
                  <button className="new-products__add-btn" type="submit"></button>
                  <div className="new-products__add-multiple">
                    <button className="new-products__decrease-btn" type="submit">-</button>
                    <span className="new-products__quantity">1</span>
                    <button className="new-products__increase-btn" type="submit">+</button>
                  </div>
                </form>
              </div>
            </li>
            <li className="new-products__product-card">
              <div className="new-products__img-container">
                <img className="new-products__product-img" src={oneComp} alt="" />
                <button className="new-products__like" type="button"></button>
                <ul className="new-products__rating">
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                </ul>
              </div>
              <div className="new-products__info">
                <h3 className="new-products__name">Корпус 12-1242 2452 54452 13546 225235 624624523</h3>
                <span className="new-products__cost">1200 руб.</span>
                <span className="new-products__cost last-cost">1100 rub</span>
                <form className="new-products__add-form" name="add-to-cart">
                  <button className="new-products__add-btn" type="submit"></button>
                  <div className="new-products__add-multiple">
                    <button className="new-products__decrease-btn" type="submit">-</button>
                    <span className="new-products__quantity">1</span>
                    <button className="new-products__increase-btn" type="submit">+</button>
                  </div>
                </form>
              </div>
            </li>
            <li className="new-products__product-card">
              <div className="new-products__img-container">
                <img className="new-products__product-img" src={oneComp} alt="" />
                <button className="new-products__like" type="button"></button>
                <ul className="new-products__rating">
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                </ul>
              </div>
              <div className="new-products__info">
                <h3 className="new-products__name">Корпус 12-1242 2452 54452 13546 225235 624624523</h3>
                <span className="new-products__cost">1200 руб.</span>
                <span className="new-products__cost last-cost">1100 rub</span>
                <form className="new-products__add-form" name="add-to-cart">
                  <button className="new-products__add-btn" type="submit"></button>
                  <div className="new-products__add-multiple">
                    <button className="new-products__decrease-btn" type="submit">-</button>
                    <span className="new-products__quantity">1</span>
                    <button className="new-products__increase-btn" type="submit">+</button>
                  </div>
                </form>
              </div>
            </li>
            <li className="new-products__product-card">
              <div className="new-products__img-container">
                <img className="new-products__product-img" src={oneComp} alt="" />
                <button className="new-products__like" type="button"></button>
                <ul className="new-products__rating">
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                </ul>
              </div>
              <div className="new-products__info">
                <h3 className="new-products__name">Корпус 12-1242 2452 54452 13546 225235 624624523</h3>
                <span className="new-products__cost">1200 руб.</span>
                <span className="new-products__cost last-cost">1100 rub</span>
                <form className="new-products__add-form" name="add-to-cart">
                  <button className="new-products__add-btn" type="submit"></button>
                  <div className="new-products__add-multiple">
                    <button className="new-products__decrease-btn" type="submit">-</button>
                    <span className="new-products__quantity">1</span>
                    <button className="new-products__increase-btn" type="submit">+</button>
                  </div>
                </form>
              </div>
            </li>
            <li className="new-products__product-card">
              <div className="new-products__img-container">
                <img className="new-products__product-img" src={oneComp} alt="" />
                <button className="new-products__like" type="button"></button>
                <ul className="new-products__rating">
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                </ul>
              </div>
              <div className="new-products__info">
                <h3 className="new-products__name">Корпус 12-1242 2452 54452 13546 225235 624624523</h3>
                <span className="new-products__cost">1200 руб.</span>
                <span className="new-products__cost last-cost">-33%</span>
                <form className="new-products__add-form" name="add-to-cart">
                  <button className="new-products__add-btn" type="submit"></button>
                  <div className="new-products__add-multiple">
                    <button className="new-products__decrease-btn" type="submit">-</button>
                    <span className="new-products__quantity">1</span>
                    <button className="new-products__increase-btn" type="submit">+</button>
                  </div>
                </form>
              </div>
            </li> */}
          </ul>
          <div className="new-products__points"></div>
          <button className="new-products__arrow arrow arrow_type_left" type="button"></button>
          <button className="new-products__arrow arrow arrow_type_right" type="button"></button>
        </div>
        </section>
  );
}
