import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Client from '../Client/Client';
import Administrator from '../Administrator/Administrator';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const script = document.createElement("script")

    script.src =
      "https://cdn.envybox.io/widget/cbk.js?wcb_code=ae755436ed8b736583a18b7452d7f89c";
    script.async = true;
    script.charset = 'UTF-8';
    /* script.integrity =
      "sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" */

    /* script.crossOrigin = "anonymous" */

    document.body.appendChild(script);

    return () => {
      // clean up the script when the component in unmounted
      document.body.removeChild(script)
    }
  }, [])

  return(
    <Routes>
      <Route path='/*' element={<Client />} />
      <Route path='/admin/*' element={<Administrator />} />
    </Routes>
  );
}

export default App;
