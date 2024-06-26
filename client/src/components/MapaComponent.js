import React, { useEffect, useState, useRef } from 'react';


import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useLocation } from 'react-router-dom';

import '../CSS/misitinerarios.css';
import publi from '../images/Publi.png';

// LEAFLET
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from "leaflet";
import 'leaflet/dist/leaflet.css';
import "leaflet.heat";


const MapaComponent = () => {

    const navigate = useNavigate();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    const query = useQuery();
    const destino = query.get('destino');
    const dias = query.get('dias');
    const personas = query.get('personas');
    const min = query.get('min');
    const max = query.get('max');
    const cordX = query.get('cordX');
    const cordY = query.get('cordY');

    const mapRef = useRef(null);

    const [itinerarios, setItinerarios] = useState([]);
    const [itinerariosPrincipio, SetitinerariosPrincipio] = useState([]);

    const [haCargado, setHaCargado] = useState(false);

    const [Etiquetas, setEtiquetas] = useState(['Todo']);


    useEffect(() => {

        if (localStorage.getItem('isLoggedIn') !== 'true') { //SI NO ESTÁ LOGUEADO
            navigate("/login");
        }

        cargarItinerarios();

    }, []);

    useEffect(() => {
        const todasEtiquetas = ['Todo', ...new Set(itinerariosPrincipio.map(itinerario => itinerario.etiqueta))];
        setEtiquetas(todasEtiquetas);
    }, [itinerariosPrincipio]);

    async function cargarItinerarios() {
        try {
            const response = await axios.post('http://localhost:3050/ItinerariosConcretos', {
                destino: destino,
                dias: dias,
                personas: personas,
                pre_min: min,
                pre_max: max
            });
            // console.log(response.data);
            setItinerarios(response.data);
            SetitinerariosPrincipio(response.data);//Duplica el array para que haya uno que los tenga todos siempre(el itinerariosPrincipio) y otro con los filtrados

            setHaCargado(true);


        } catch (error) {
            console.error('Error al obtener los itinerarios:', error);
        }
    }

    const filtrarEtiquetas = (etiqueta) => {
        if (etiqueta === 'Todo') {
            const itinerariosFiltrados = itinerariosPrincipio.filter(itinerario => itinerario.etiqueta.trim() !== '');
            setItinerarios(itinerariosFiltrados);
            return
        }

        const itinerariosFiltrados = itinerariosPrincipio.filter(itinerario => itinerario.etiqueta === etiqueta);
        setItinerarios(itinerariosFiltrados);

    }

    const handleItinerarioClick = (id) => {

        navigate(`/itinerario/${id}`);
    };

    return (
        <div className='MisItinerariosdiv'>
            <div className='publicidad'>
                <img src={publi} alt='publi'></img>
            </div>

            <div className='contenidoMisItinerarios'>


                <div className='filtros_y_itinerarios-listas'>
                    <div className='filtros_container-listas'>



                        <div className='etiquetas-listas'>
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


                    {haCargado && cordX && cordY && (
                        <div className="itinerarios-container-listas">
                            {console.log(itinerarios)}
                            <MapContainer center={[Number(cordY), Number(cordX)]} zoom={13} id='map' ref={mapRef}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {itinerarios.map(itinerario => (
                                    <Polygon
                                        key={itinerario.id}
                                        positions={itinerario.coordenadas[0].map(coord => [coord.y, coord.x])}
                                        color='red'
                                    // eventHandlers={{
                                    //     click: () => {
                                    //         handleItinerarioClick(itinerario.id);
                                    //     }
                                    // }}

                                    >
                                        <Popup>
                                            <div>
                                                <button onClick={() => handleItinerarioClick(itinerario.id)}>Ver itinerario</button>
                                            </div>
                                        </Popup>
                                    </Polygon>
                                ))}
                            </MapContainer>

                        </div>
                    )}

                </div>


            </div>

            <div className='publicidad'>
                <img src={publi} alt='publi'></img>

            </div>
        </div >
    )
}


export default MapaComponent;