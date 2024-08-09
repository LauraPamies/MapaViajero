import React, { useEffect, useState } from 'react';
import moment from 'moment';

import '../CSS/register.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";

import '../CSS/misitinerarios.css';
import publi from '../images/Publi.png';

//IMPORT NOTIFICACIONES
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { useForm } from "react-hook-form";
import View_img from '../images/View.png';
import Edit_img from '../images/edit.png';
import Delete_img from '../images/Delete.png';



const MisItinerariosComponent = () => {

    const navigate = useNavigate();
    const noti = withReactContent(Swal)


    const [itinerarios, setItinerarios] = useState([]);
    const [itinerariosPrincipio, SetitinerariosPrincipio] = useState([]);
    const [Etiquetas, setEtiquetas] = useState(['Todo']);

    const opciones_ordenar = [
        { label: "Mas barato primero", value: "precio_asc" },
        { label: "Mas caro primero", value: "precio_desc" },
        { label: "Mas nuevos primero", value: "fecha_desc" },
        { label: "Mas antiguos primero", value: "fecha_asc" }
    ]

    const editarItinerario = (id) => {
       
            const id_itinerario = id;

            // Construye la URL con los parámetros opcionales
            const queryParams = new URLSearchParams({
                id_itinerario
            }).toString();

            navigate(`/subirItinerario?${queryParams}`);
        

    };

    useEffect(() => {

        if (localStorage.getItem('isLoggedIn') !== 'true') { //SI NO ESTÁ LOGUEADO
            navigate("/login");
        }
        cargarItinerarios();
    }, []);

    async function cargarItinerarios() {
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


    const borrarItinerario = (id_itinerario) => {
        Swal.fire({
            title: "Confirmar",
            text: "Eliminar itinerario",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar"

        }).then((result) => {
            if (result.isConfirmed) {

                borrarItinerarioAceptado(id_itinerario);
            }
        });
    };

    const borrarItinerarioAceptado = (async (id_itinerario) => {

        try {
            const response = await axios.post('http://localhost:3050/borrarItinerario', {
                id_itinerario: id_itinerario
            });
            cargarItinerarios();


        } catch (error) {
            console.error('Error al borrar favorito:', error);
        }
    });

    return (
        <div className='MisItinerariosdiv'>
            <div className='publicidad'>
                <img src={publi} alt='publi'></img>
            </div>

            <div className='contenidoMisItinerarios'>
                {/* BOTON */}
                <button type='submit' id='botonItinerarios' onClick={() => {
                    navigate("/subirItinerario");
                }}>Añadir itinerario</button>
                <div className='filtros_y_itinerarios-mis'>
                    <div className='filtros_container-mis'>


                        <div>

                            <h4>Ordenar por</h4>
                            <select className='orden_select-mis' onChange={orden_cambiado}>
                                {opciones_ordenar.map(opcion => (
                                    <option value={opcion.value}>{opcion.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className='etiquetas-mis'>
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

                    <div className="itinerarios-container-mis">
                        {itinerarios.map((itinerario, index) => (
                            <div key={itinerario.id} className="itinerario-card-mis" >
                                <div className="image-container">
                                    <img
                                        src={`http://localhost:3050/${itinerario.nombre_foto}`}
                                        alt={itinerario.nombre_foto}
                                        className="itinerario-imagen-mis"
                                    />
                                </div>
                                <div className="itinerario-info-mis">
                                    <div>
                                        <h2 className="itinerario-titulo-mis">{itinerario.titulo}</h2>
                                    </div>

                                    <div id='iti-dias-precio-mis'>
                                        <p>{itinerario.dias} días</p>
                                        <p className="itinerario-precio-mis">{itinerario.precio}€</p>
                                    </div>
                                    <div id='iti-personas-mis'>
                                        <p>{itinerario.personas} personas</p>
                                        <p>{moment(itinerario.fecha).format('DD/MM/YYYY')}</p>
                                    </div>
                                </div>

                                <div className='acciones-mis'>
                                    <div className='acciones-1-mis'>
                                        <img onClick={() => navigate(`/itinerario/${itinerario.id}`)} id="chat" src={View_img} alt='chat' style={{ cursor: 'pointer' }}></img>
                                        <img onClick={() => editarItinerario(itinerario.id)} id="chat" src={Edit_img} alt='chat' style={{ cursor: 'pointer' }}></img>
                                    </div>
                                    <div className='acciones-2-mis'>
                                        <img onClick={() => borrarItinerario(itinerario.id)} id="chat" src={Delete_img} alt='chat' style={{ cursor: 'pointer' }}></img>

                                    </div>

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