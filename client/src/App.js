import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//IMPORTAR COMPONENTES
import Header from './components/HeaderComponent'
import Footer from './components/FooterComponent'
import Login from './components/LoginComponent'
import Registro from './components/RegisterComponent'
import Landing from './components/LandingComponent'
import Prespuesto from './components/PredecirpresupuestoComponent'
import Listas from './components/ListasComponent'
import IitinerarioInfo from './components/IitinerarioInfo'
import MisItinerarios from './components/MisItinerariosComponent'
import Favoritos from './components/FavoritosComponent'


function App() {

  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/presupuesto" element={<Prespuesto />} />
        <Route path="/listas" element={<Listas />} />
        <Route path="/itinerario/:id" element={<IitinerarioInfo />} />
        <Route path="/MisItinerarios" element={<MisItinerarios />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
      <Footer />

    </BrowserRouter>


  );

}

export default App;
