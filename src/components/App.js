import { Routes, Route } from 'react-router-dom';
import '../index.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Catalog from './Catalog/Catalog';
import Footer from './Footer/Footer';
import ComputerCases from './ComputerCases/ComputerCases';
import useWindowDimensions from '../hooks/useWindowDimensions';
import TopButton from './TopButton/TopButton';

function App() {
  const { width } = useWindowDimensions();

  return (
    <div className="page">
      <Header width={width} />
      <main className="main">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/catalog'>
          <Route index element={<Catalog />} />
          <Route path='computer-cases' element={<ComputerCases width={width} />} />
        </Route>
      </Routes>
      </main>
      <Footer />
      <TopButton />
    </div>
  );
}

export default App;
