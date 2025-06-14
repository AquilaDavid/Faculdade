
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Tabela_Nomes from './components/Tabela_Nomes';
import Footer from './components/Footer';


function App(){
  return (
    <div>
      <Header />
      <Tabela_Nomes />
      <Footer/>
    </div>
  );
}

export default App;