import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Client from '../Client/Client';
import Administrator from '../Administrator/Administrator';

function App() {
  return(
    <Routes>
      <Route path='/*' element={<Client />} />
      <Route path='/admin/*' element={<Administrator />} />
    </Routes>
  );
}

export default App;
