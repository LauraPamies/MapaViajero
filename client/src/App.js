import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//IMPORTAR COMPONENTES
import Header from './components/HeaderComponent'
import Login from './components/LoginComponent'
import Registro from './components/RegisterComponent'
import Landing from './components/LandingComponent'
import Prespuesto from './components/PredecirpresupuestoComponent'
import Listas from './components/ListasComponent'
import IitinerarioInfo from './components/IitinerarioInfo'


function App() {

  return (
    
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Landing />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/presupuesto" element={<Prespuesto />} />
        <Route path="/listas" element={<Listas />} />
        <Route path="/itinerario/:id" element={<IitinerarioInfo />} />
      </Routes>
    </BrowserRouter>


  );

}

export default App;
