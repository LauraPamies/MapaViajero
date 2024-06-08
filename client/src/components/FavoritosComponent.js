import React, { useEffect, useState } from 'react';

import '../CSS/register.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";

import '../CSS/favoritos.css';
import publi from '../images/Publi.png';

//IMPORT NOTIFICACIONES
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faHeartCircleMinus } from '@fortawesome/free-solid-svg-icons'

// IMPORT IMAGENES
import destino_img from '../images/Location.png';
import calendar_img from '../images/Calendar.png';
import people_img from '../images/People.png';
import map_img from '../images/Map.png';

const FavoritosComponent = () => {

const noti = withReactContent(Swal)


    const opciones_ordenar = [
        { label: "Mas barato primero", value: "precio_asc" },
        { label: "Mas caro primero", value: "precio_desc" },
        { label: "Mas nuevos primero", value: "fecha_desc" },
        { label: "Mas antiguos primero", value: "fecha_asc" }
    ]
    const navigate = useNavigate();

    const [itinerariosfav, setItinerariosfav] = useState([]);
    const [itinerariosfavPrincipio, SetitinerariosfavPrincipio] = useState([]);
    const [Etiquetas, setEtiquetas] = useState(['Todo']);


    useEffect(() => {   //AL CARGAR LA PÁGINA

        if (localStorage.getItem('isLoggedIn') !== 'true') { //SI NO ESTÁ LOGUEADO
            navigate("/login");
        }

       
        cargarFavs();


    }, []);

    async function cargarFavs() {
        var id_usuario = localStorage.getItem('userId');

        try {
            const response = await axios.post('http://localhost:3050/favoritos', {
                id_usuario: id_usuario,
                orden: "precio_asc"
            });
            setItinerariosfav(response.data);
            SetitinerariosfavPrincipio(response.data);//Duplica el array para que haya uno que los tenga todos siempre(el itinerariosPrincipio) y otro con los filtrados
            console.log(response.data);

        } catch (error) {
            console.error('Error al obtener los itinerarios:', error);
        }
    }

    useEffect(() => {
        const todasEtiquetas = ['Todo', ...new Set(itinerariosfavPrincipio.map(itinerario => itinerario.etiqueta))];
        setEtiquetas(todasEtiquetas);
    }, [itinerariosfavPrincipio]);

    const handleItinerarioClick = (id) => {

        navigate(`/itinerario/${id}`);
    };

    const orden_cambiado = (async (event) => {
        var id_usuario = localStorage.getItem('userId');
        try {
            const response = await axios.post('http://localhost:3050/favoritos', {
                orden: event.target.value,
                id_usuario: id_usuario
            });
            setItinerariosfav(response.data);
            SetitinerariosfavPrincipio(response.data);//Duplica el array para que haya uno que los tenga todos siempre(el itinerariosPrincipio) y otro con los filtrados

        } catch (error) {
            console.error('Error al obtener los itinerarios:', error);
        }

    });

    const filtrarEtiquetas = (etiqueta) => {
        if (etiqueta === 'Todo') {
            const itinerariosFiltrados = itinerariosfavPrincipio.filter(itinerario => itinerario.etiqueta.trim() !== '');
            setItinerariosfav(itinerariosFiltrados);
            return
        }

        const itinerariosFiltrados = itinerariosfavPrincipio.filter(itinerario => itinerario.etiqueta === etiqueta);
        setItinerariosfav(itinerariosFiltrados);

    }

    const borrarFav = (id_itinerario) =>{
        Swal.fire({
            title: "Confirmar",
            text: "Eliminar de favoritos",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar"

          }).then((result) => {
            if (result.isConfirmed) {

                borrarFavAceptado(id_itinerario);

            }
          });
    };

    const borrarFavAceptado = (async (id_itinerario) =>{
        var id_usuario = localStorage.getItem('userId');

        try {
            const response = await axios.post('http://localhost:3050/borrarFav', {
                id_itinerario: id_itinerario,
                id_usuario: id_usuario
            });
        cargarFavs();


        } catch (error) {
            console.error('Error al borrar favorito:', error);
        }
    });


   

    return (
        <div className='Listasdiv'>
            <div className='publicidad'>
                <img src={publi} alt='publi'></img>
            </div>

            <div className='contenidoListas'>

                <button onClick={() => {
                    navigate("/listas");
                }} id='boton-explorar'>Explorar</button>

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
                        {itinerariosfav.map((itinerario, index) => (
                            <div key={itinerario.id} id='itinerario-card-complete'>
                                <div className="itinerario-card" >
                                    <div className="image-container">
                                        <img
                                            src={`${process.env.PUBLIC_URL}/fotos_itinerarios/${itinerario.foto.split('/').pop()}`}
                                            alt={itinerario.titulo}
                                            className="itinerario-imagen"
                                        />
                                    </div>
                                    <div className="itinerario-info" onClick={() => handleItinerarioClick(itinerario.id_itinerario)} style={{ cursor: 'pointer' }}>
                                        <div>
                                            <h2 className="itinerario-titulo">{itinerario.titulo}</h2>
                                        </div>
                                        <div id='iti-dias-precio'>
                                            <p>{itinerario.dias} días</p>
                                            <p className="itinerario-precio">{itinerario.precio}€</p>
                                        </div>
                                        <div id='iti-personas'>
                                            <p>{itinerario.personas} personas</p>
                                            <p className="itinerario-autor">{itinerario.etiqueta}</p>
                                        </div>
                                    </div>
                                    <div className="heart-container">
                                    <button onClick={()=>borrarFav(itinerario.id_itinerario)} id='fav-icon-red'><FontAwesomeIcon icon={faHeartCircleMinus} /></button>


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


export default FavoritosComponent;