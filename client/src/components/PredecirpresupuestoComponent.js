// import React from 'react';
import React, { useEffect, useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";


import { Link, Navigate, useNavigate } from 'react-router-dom';

//IMPORT NOTIFICACIONES
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../CSS/predecirpresupuesto.css';
import publi from '../images/Publi.png';
import imgizq from '../images/image5.png';
import imgder from '../images/image2.png';

import destino_img from '../images/Place.png';
import people_img from '../images/People35.png';
import calendar_img from '../images/calendar35.png';


const PredecirpresupuestoComponent = () => {

    const navigate = useNavigate();
    const [prediccion, setPrediccion] = useState(null);

    const noti = withReactContent(Swal)


    useEffect(() => {

        if (localStorage.getItem('isLoggedIn') !== 'true') { //SI NO ESTÁ LOGUEADO
            navigate("/login");
        }
    }, []);

    //FORMULARIO
    const { register, handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm()


    const onSubmit = handleSubmit(async (data) => {

        console.log(data);

        try {
            const responseItinerario = await axios.post('http://localhost:3050/predecir', {
                destino: parseInt(data.destino, 10),
                dias: parseInt(data.dias, 10),
                viajeros: parseInt(data.personas, 10)
            });
            var numero = Math.round(responseItinerario.data.prediccion[0]); 
            setPrediccion(numero);
        
            // Mostrar el número en un pop-up usando sweetalert2
            noti.fire({
                title: 'Predicción',
                text: 'El precio aproximado del viaje será de: ' + numero + ' €'
            });
        
        } catch (error) {
            console.error('Error al predecir:', error);
            noti.fire({
                title: 'Error',
                text: 'Error al predecir',
                icon: 'error'
            });
        }
    });


    const provincias = [
        { id: 19, nombre: 'Álava' },
        { id: 20, nombre: 'Albacete' },
        { id: 8, nombre: 'Alicante' },
        { id: 21, nombre: 'Almería' },
        { id: 22, nombre: 'Asturias' },
        { id: 23, nombre: 'Ávila' },
        { id: 24, nombre: 'Badajoz' },
        { id: 25, nombre: 'Baleares' },
        { id: 1, nombre: 'Barcelona' },
        { id: 6, nombre: 'Burgos' },
        { id: 15, nombre: 'Cáceres' },
        { id: 12, nombre: 'Cádiz' },
        { id: 11, nombre: 'Cantabria' },
        { id: 26, nombre: 'Castellón' },
        { id: 27, nombre: 'Ceuta' },
        { id: 28, nombre: 'Ciudad Real' },
        { id: 29, nombre: 'Córdoba' },
        { id: 30, nombre: 'Cuenca' },
        { id: 31, nombre: 'Gerona' },
        { id: 4, nombre: 'Granada' },
        { id: 13, nombre: 'Guadalajara' },
        { id: 32, nombre: 'Guipúzcoa' },
        { id: 33, nombre: 'Huelva' },
        { id: 34, nombre: 'Huesca' },
        { id: 35, nombre: 'Jaén' },
        { id: 36, nombre: 'La Coruña' },
        { id: 37, nombre: 'La Rioja' },
        { id: 38, nombre: 'Las Palmas' },
        { id: 39, nombre: 'León' },
        { id: 40, nombre: 'Lérida' },
        { id: 18, nombre: 'Lugo' },
        { id: 0, nombre: 'Madrid' },
        { id: 5, nombre: 'Málaga' },
        { id: 41, nombre: 'Melilla' },
        { id: 10, nombre: 'Murcia' },
        { id: 42, nombre: 'Navarra' },
        { id: 43, nombre: 'Orense' },
        { id: 14, nombre: 'Palencia' },
        { id: 44, nombre: 'Pontevedra' },
        { id: 9, nombre: 'Salamanca' },
        { id: 16, nombre: 'Segovia' },
        { id: 2, nombre: 'Sevilla' },
        { id: 45, nombre: 'Soria' },
        { id: 17, nombre: 'Tarragona' },
        { id: 46, nombre: 'Tenerife' },
        { id: 47, nombre: 'Teruel' },
        { id: 48, nombre: 'Toledo' },
        { id: 3, nombre: 'Valencia' },
        { id: 49, nombre: 'Valladolid' },
        { id: 50, nombre: 'Vizcaya' },
        { id: 51, nombre: 'Zamora' },
        { id: 7, nombre: 'Zaragoza' }
    ];
    

   return (
        <div className='Predecirdiv'>
            <div className='publicidad'>
                <img src={publi} alt='publi' />
            </div>

            <div className='contenidopubli'>
                <div className='textospredecir'>
                    <h1>PREDECIR PRESUPUESTO</h1>
                    <h3>Prepárate para tu próxima aventura: Descubre fácilmente el presupuesto estimado para tus futuros viajes.</h3>
                </div>
                <div className='formpublidiv'>
                    <div id='imagenpubli1'>
                        <img src={imgizq} alt='publi' />
                    </div>
                    <form onSubmit={onSubmit} id='predecirform'>
                        <div id='contenedorformulariopred'>
                            {/* Destino */}
                            <div id='divs-errores'>
                                <div id="inputformpred">
                                    <span id="iconpred">
                                        <img src={destino_img} alt='logo' width={"25px"} />
                                    </span>
                                    <select id="inputpred" {...register("destino", { required: "Destino requerido" })}>
                                        <option value="">Elige Provincia</option>
                                        {provincias.map(provincia => (
                                            <option key={provincia.id} value={provincia.id}>
                                                {provincia.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    {errors.destino && <span>{errors.destino.message}</span>}
                                </div>
                            </div>

                            {/* Dias */}
                            <div id='divs-errores'>
                                <div id="inputformpred">
                                    <span id="iconpred">
                                        <img src={calendar_img} alt='logo' width={"25px"} />
                                    </span>
                                    <input id="inputpred" placeholder="Nº días" type='number' min="1"
                                        {...register("dias", { required: "Nº días requerido" })}
                                    />
                                </div>
                                <div>
                                    {errors.dias && <span>{errors.dias.message}</span>}
                                </div>
                            </div>

                            {/* Personas */}
                            <div id='divs-errores'>
                                <div id="inputformpred">
                                    <span id="iconpred">
                                        <img src={people_img} alt='logo' width={"25px"} />
                                    </span>
                                    <input id="inputpred" placeholder="Nº personas" type='number' min="1"
                                        {...register("personas", { required: "Nº personas requerido" })}
                                    />
                                </div>
                                <div>
                                    {errors.personas && <span>{errors.personas.message}</span>}
                                </div>
                            </div>

                        </div>
                        {/* BOTON */}
                        <button type='submit' id='botonpredecir'>Predecir</button>
                    </form>
                    <div id='imagenpubli2'>
                        <img src={imgder} alt='publi' />
                    </div>
                </div>
            </div>
            <div className='publicidad'>
                <img src={publi} alt='publi' />
            </div>
        </div>
    );
}

export default PredecirpresupuestoComponent;