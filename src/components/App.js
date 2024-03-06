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
import { CurrentUserContext } from '../contexts/CurrentUserContexts';
import { CurrentCardContext } from '../contexts/CurrentCardContext';
import { useEffect, useState } from 'react';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentCard, setCurrentCard] = useState({});
  const { width } = useWindowDimensions();
  /* const { pathname } = useLocation(); */
  const scroll = useVerticalScroll();

  useEffect(() => {
    const card = localStorage.getItem('card');
    setCurrentCard(JSON.parse(card));
  },[])

  function handleProductClick(card) {
    setCurrentCard(card);
    localStorage.setItem('card', JSON.stringify(card));
  }

  return (
    <div className="page">
      <Header width={width} />
      <main className="main">
        <CurrentUserContext.Provider value={currentUser}>
          <CurrentCardContext.Provider value={currentCard}>
            <Routes>
              <Route path='/' element={<Main onProductClick={handleProductClick} />} />
              <Route path='/catalog'>
                <Route index element={<Catalog />} />
                <Route path='computer-cases' element={<ComputerCases width={width} scroll={scroll} onProductClick={handleProductClick} />} />
                <Route path='computer-cases/:id' element={<ProductView />} />
              </Route>
            </Routes>
          </CurrentCardContext.Provider>
        </CurrentUserContext.Provider>
      </main>
      <Footer />
      <TopButton scroll={scroll} />
    </div>
  );
}

export default App;
