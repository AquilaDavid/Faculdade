// src/assets/components/Layout.jsx
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx"
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Layout() {
  return (
    <div>
      <Header/>
      <main style={{ minHeight: '80vh'}}>
        <Outlet/>

      </main>
      <Footer/>
    </div>
  );
}