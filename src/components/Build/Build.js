import ComputerCases from '../ComputerCases/ComputerCases';
import cover from '../../images//anthony-roberts-W_DCDWCL3Wo-unsplash.jpg';
import './Build.css';

export default function Build({ cards, width, scroll, pathname }) {
  return(
    <div className="build">
      <section className="build__start">
        <img className="build__image" src={cover} alt='' />
      </section>
      <ComputerCases name='Готовые сборки' cards={cards} width={width} scroll={scroll} pathname={pathname} />
    </div>
  );
}

