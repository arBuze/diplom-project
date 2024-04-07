import ComputerCases from '../ComputerCases/ComputerCases';
import './Build.css';

export default function Build({ cards, width, scroll, pathname, onLike, onDislike, onCartAdd, onCartRemove, faves, cart }) {
  return(
    <div className="build">
      <section className="build__start">
        {/* <img className="build__image" src={cover} alt='' /> */}
        <button className="build__button" type="button">Начать сборку</button>
      </section>
      <ComputerCases name='Готовые сборки' cards={cards} width={width}
        scroll={scroll} pathname={pathname}
        onLike={onLike} onDislike={onDislike}
        onCartAdd={onCartAdd} onCartRemove={onCartRemove}
        faves={faves} cart={cart} />
    </div>
  );
}

