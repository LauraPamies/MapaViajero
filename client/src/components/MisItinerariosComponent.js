import React, { useEffect, useState } from 'react';

import '../CSS/register.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";

import '../CSS/misitinerarios.css';
import publi from '../images/Publi.png';

import { useForm } from "react-hook-form";
import chat from '../images/chat_icon.png';



const MisItinerariosComponent = () => {

    const navigate = useNavigate();


    const [itinerarios, setItinerarios] = useState([]);

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


            } catch (error) {
                console.error('Error al obtener los itinerarios:', error);
            }
        }

        fetchData();
    }, []);





    return (
        <div className='MisItinerariosdiv'>
            <div className='publicidad'>
                <img src={publi} alt='publi'></img>
            </div>

            <div className='contenidoMisItinerarios'>
                {/* BOTON */}
                <button type='submit' id='botonItinerarios'>Añadir itinerario</button>

                <div className="itinerarios-container">
                    {itinerarios.map((itinerario, index) => (
                        <div key={itinerario.id} className="itinerario-card" >
                            <div className="image-container">
                                <img
                                    src={`${process.env.PUBLIC_URL}/fotos_itinerarios/${itinerario.foto.split('/').pop()}`}
                                    alt={itinerario.titulo}
                                    className="itinerario-imagen" />
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
                                    <img id="chat" src={chat} alt='chat'></img>

                                </div>


                            </div>
                            <div>
                                <img id="chat" src={chat} alt='chat'></img>

                            </div>

                        </div>
                    ))}
                </div>


            </div>

            <div className='publicidad'>
                <img src={publi} alt='publi'></img>

            </div>
        </div >
    )
}


export default MisItinerariosComponent;