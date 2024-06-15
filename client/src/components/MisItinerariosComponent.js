import React, { useEffect, useState } from 'react';

import '../CSS/register.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";

import '../CSS/misitinerarios.css';
import publi from '../images/Publi.png';

import { useForm } from "react-hook-form";
import View_img from '../images/View.png';
import Edit_img from '../images/edit.png';
import Delete_img from '../images/Delete.png';



const MisItinerariosComponent = () => {

    const navigate = useNavigate();


    const [itinerarios, setItinerarios] = useState([]);
    const [itinerariosPrincipio, SetitinerariosPrincipio] = useState([]);
    const [Etiquetas, setEtiquetas] = useState(['Todo']);

    const opciones_ordenar = [
        { label: "Mas barato primero", value: "precio_asc" },
        { label: "Mas caro primero", value: "precio_desc" },
        { label: "Mas nuevos primero", value: "fecha_desc" },
        { label: "Mas antiguos primero", value: "fecha_asc" }
    ]

    useEffect(() => {

        if (localStorage.getItem('isLoggedIn') !== 'true') { //SI NO ESTÁ LOGUEADO
            navigate("/login");
        }

        async function fetchData() {
            try {
                const response = await axios.post('http://localhost:3050/misItinerarios', {
                    autor_id: localStorage.getItem('userId')
                });
                setItinerarios(response.data);
                SetitinerariosPrincipio(response.data);//Duplica el array para que haya uno que los tenga todos siempre(el itinerariosPrincipio) y otro con los filtrados


            } catch (error) {
                console.error('Error al obtener los itinerarios:', error);
            }
        }

        fetchData();
    }, []);


    useEffect(() => {
        const todasEtiquetas = ['Todo', ...new Set(itinerariosPrincipio.map(itinerario => itinerario.etiqueta))];
        setEtiquetas(todasEtiquetas);
    }, [itinerariosPrincipio]);


    const orden_cambiado = (async (event) => {


        try {
            const response = await axios.post('http://localhost:3050/misItinerarios', {
                autor_id: localStorage.getItem('userId'),
                orden: event.target.value
            });
            setItinerarios(response.data);
            SetitinerariosPrincipio(response.data);//Duplica el array para que haya uno que los tenga todos siempre(el itinerariosPrincipio) y otro con los filtrados
            // setImagenes(response.data.imagenes);
        } catch (error) {
            console.error('Error al obtener los itinerarios:', error);
        }

    });

    const filtrarEtiquetas = (etiqueta) => {
        if (etiqueta === 'Todo') {
            const itinerariosFiltrados = itinerariosPrincipio.filter(itinerario => itinerario.etiqueta.trim() !== '');
            setItinerarios(itinerariosFiltrados);
            return
        }

        const itinerariosFiltrados = itinerariosPrincipio.filter(itinerario => itinerario.etiqueta === etiqueta);
        setItinerarios(itinerariosFiltrados);

    }


    return (
        <div className='MisItinerariosdiv'>
            <div className='publicidad'>
                <img src={publi} alt='publi'></img>
            </div>

            <div className='contenidoMisItinerarios'>
                {/* BOTON */}
                <button type='submit' id='botonItinerarios'>Añadir itinerario</button>
                <div className='filtros_y_itinerarios'>
                    <div className='filtros_container'>


                        <div>

                            <h4>Ordenar por</h4>
                            <select className='orden_select' onChange={orden_cambiado}>
                                {opciones_ordenar.map(opcion => (
                                    <option value={opcion.value}>{opcion.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className='etiquetas'>
                            <h4>Tipo de viaje</h4>
                            <div >
                                {Etiquetas.map(etiqueta => (
                                    <label key={etiqueta} style={{ display: "block" }}>
                                        <input
                                            type="radio"
                                            value={etiqueta}
                                            name="etiqueta"
                                            onClick={() => filtrarEtiquetas(etiqueta)}
                                        />
                                        {etiqueta}
                                    </label>
                                ))}
                            </div>
                        </div>

                    </div>

                    <div className="itinerarios-container">
                        {itinerarios.map((itinerario, index) => (
                            <div key={itinerario.id} className="itinerario-card" >
                                <div className="image-container">
                                    <img
                                        src={`http://localhost:3050/${itinerario.nombre_foto}`}
                                        alt={itinerario.nombre_foto}
                                        className="itinerario-imagen"
                                    />
                                </div>
                                <div className="itinerario-info">
                                    <div>
                                        <h2 className="itinerario-titulo">{itinerario.titulo}</h2>
                                    </div>

                                    <div id='iti-dias-precio'>
                                        <p>{itinerario.dias} días</p>
                                        <p className="itinerario-precio">{itinerario.precio}€</p>

                                    </div>
                                    <div id='iti-personas'>
                                        <p>{itinerario.personas} personas</p>
                                        <img id="chat" src={View_img} alt='chat'></img>
                                        <img id="chat" src={View_img} alt='chat'></img>
                                        {/* <img id="chat" src={View_img} alt='chat'></img> */}

                                    </div>


                                </div>
                                <div>
                                    <img id="chat" src={View_img} alt='chat'></img>

                                </div>

                            </div>
                        ))}
                    </div>
                </div>



            </div>

            <div className='publicidad'>
                <img src={publi} alt='publi'></img>

            </div>
        </div >
    )
}


export default MisItinerariosComponent;