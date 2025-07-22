import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';


import Instituicao_Ensino from "./pages/Instituicao_Ensino";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="/instituicaoEnsino" element={<Instituicao_Ensino />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
