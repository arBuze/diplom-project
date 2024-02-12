import { Routes, Route } from 'react-router-dom';
import '../index.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Catalog from './Catalog/Catalog';
import Footer from './Footer/Footer';
import ComputerCases from './ComputerCases/ComputerCases';

function App() {
  return (
    <div className="page">
      <Header />
      <main className="main">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/catalog'>
          <Route index element={<Catalog />} />
          <Route path='computer-cases' element={<ComputerCases />} />
        </Route>
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
