import { Routes, Route } from 'react-router-dom';
import '../index.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Catalog from './Catalog/Catalog';
import Footer from './Footer/Footer';
import ComputerCases from './ComputerCases/ComputerCases';
import useWindowDimensions from '../hooks/useWindowDimensions';
import TopButton from './TopButton/TopButton';
import useVerticalScroll from '../hooks/useVerticalScroll';
import ProductView from './ProductView/ProductView';

function App() {
  const { width } = useWindowDimensions();
  /* const { pathname } = useLocation(); */
  const scroll = useVerticalScroll();

  return (
    <div className="page">
      <Header width={width} />
      <main className="main">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/catalog'>
          <Route index element={<Catalog />} />
          <Route path='computer-cases' element={<ComputerCases width={width} scroll={scroll} />} />
          <Route path='computer-cases/:id' element={<ProductView />} />
        </Route>
      </Routes>
      </main>
      <Footer />
      <TopButton scroll={scroll} />
    </div>
  );
}

export default App;
