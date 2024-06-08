import React, { useEffect, useState, useRef } from 'react';

import '../CSS/register.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";

// LEAFLET
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from "leaflet";
import 'leaflet/dist/leaflet.css';
import "leaflet.heat";

import '../CSS/subir.css';
import publi from '../images/Publi.png';

//IMPORT NOTIFICACIONES
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useForm } from "react-hook-form";

import { faHeartCircleMinus } from '@fortawesome/free-solid-svg-icons'

// IMPORT IMAGENES
import destino_img from '../images/Location.png';
import calendar_img from '../images/Calendar.png';
import people_img from '../images/People.png';
import tempIcon from '../images/tempMarkerIcon.png';

const SubirComponent = () => {

    const tempMarkerIcon = L.icon({
        iconUrl: tempIcon,
        iconSize: [30, 40]
    });

    const MarkerIcon = L.icon({
        iconUrl: destino_img,
        iconSize: [40, 40]
    });

    const [HaBuscado, setHaBuscado] = useState(true);
    const navigate = useNavigate();
    const [datosItinerario, setDatosItinerario] = useState([]);
    const mapRef = useRef(null);
    const [markers, setMarkers] = useState([]);
    const [tempMarker, setTempMarker] = useState(null);

    useEffect(() => {   //AL CARGAR LA PÁGINA

        if (localStorage.getItem('isLoggedIn') !== 'true') { //SI NO ESTÁ LOGUEADO
            navigate("/login");
        }


    }, []);

    const handleDeleteMarker = (id) => {
        setMarkers(prevMarkers => prevMarkers.filter(marker => marker.id !== id));

    };

    const handleMarkerTitleChange = (newTitle) => {
        setTempMarker(prevMarker => ({ ...prevMarker, title: newTitle }));
    };
    const handleMapClick = (e) => {
        const newMarker = {
            id: Date.now(),
            position: e.latlng,
            title: ""
        };
        setTempMarker(newMarker);
    };

    const handleSaveMarker = () => {
        setMarkers((prevMarkers) => {
            const newMarkers = [...prevMarkers, tempMarker];
            console.log("Marcadores guardados:", newMarkers);
            return newMarkers;
        });
        setTempMarker(null);
    };
    const MapClickHandler = () => {
        useMapEvents({
            click: handleMapClick,
        });
        return null;
    };

    //FORMULARIO
    const { register, handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm()


    const onSubmit = handleSubmit(async (data) => {

        console.log(data);
        setDatosItinerario(data);
        setHaBuscado(true);
    });



    return (
        <div className='Listasdiv'>
            <div className='publicidad'>
                <img src={publi} alt='publi'></img>
            </div>

            <div className='contenidoListas'>

                <h2 id='subir-text'>SUBIR ITINERARIO</h2>
                <h3 id='plantilla'>Recomendación plantilla itinerario</h3>


                <form onSubmit={onSubmit} id='formularioreg'>
                    <div id='contenedorformulario'>
                        {/* Destino */}
                        <div id='divs-errores'>
                            <div id="inputformlista">
                                <span id="icon"><img src={destino_img} alt='logo' width={"25px"}></img></span>
                                <input id="input" list="Provincias" placeholder="Destino" type='text'
                                    {...register("destino", {
                                        required: {
                                            value: true,
                                            message: "Destino requerido"
                                        }
                                    })}
                                ></input>


                                <datalist id='Provincias'>
                                    <option value="">Elige Provincia</option>
                                    <option value="Álava">Álava</option>
                                    <option value="Albacete">Albacete</option>
                                    <option value="Alicante">Alicante</option>
                                    <option value="Almería">Almería</option>
                                    <option value="Asturias">Asturias</option>
                                    <option value="Ávila">Ávila</option>
                                    <option value="Badajoz">Badajoz</option>
                                    <option value="Baleares">Baleares</option>
                                    <option value="Barcelona">Barcelona</option>
                                    <option value="Burgos">Burgos</option>
                                    <option value="Cáceres">Cáceres</option>
                                    <option value="Cádiz">Cádiz</option>
                                    <option value="Cantabria">Cantabria</option>
                                    <option value="Castellón">Castellón</option>
                                    <option value="Ceuta">Ceuta</option>
                                    <option value="Ciudad Real">Ciudad Real</option>
                                    <option value="Córdoba">Córdoba</option>
                                    <option value="Cuenca">Cuenca</option>
                                    <option value="Gerona">Gerona</option>
                                    <option value="Granada">Granada</option>
                                    <option value="Guadalajara">Guadalajara</option>
                                    <option value="Guipúzcoa">Guipúzcoa</option>
                                    <option value="Huelva">Huelva</option>
                                    <option value="Huesca">Huesca</option>
                                    <option value="Jaén">Jaén</option>
                                    <option value="La Coruña">La Coruña</option>
                                    <option value="La Rioja">La Rioja</option>
                                    <option value="Las Palmas">Las Palmas</option>
                                    <option value="León">León</option>
                                    <option value="Lérida">Lérida</option>
                                    <option value="Lugo">Lugo</option>
                                    <option value="Madrid">Madrid</option>
                                    <option value="Málaga">Málaga</option>
                                    <option value="Melilla">Melilla</option>
                                    <option value="Murcia">Murcia</option>
                                    <option value="Navarra">Navarra</option>
                                    <option value="Orense">Orense</option>
                                    <option value="Palencia">Palencia</option>
                                    <option value="Pontevedra">Pontevedra</option>
                                    <option value="Salamanca">Salamanca</option>
                                    <option value="Segovia">Segovia</option>
                                    <option value="Sevilla">Sevilla</option>
                                    <option value="Soria">Soria</option>
                                    <option value="Tarragona">Tarragona</option>
                                    <option value="Tenerife">Tenerife</option>
                                    <option value="Teruel">Teruel</option>
                                    <option value="Toledo">Toledo</option>
                                    <option value="Valencia">Valencia</option>
                                    <option value="Valladolid">Valladolid</option>
                                    <option value="Vizcaya">Vizcaya</option>
                                    <option value="Zamora">Zamora</option>
                                    <option value="Zaragoza">Zaragoza</option>
                                </datalist>
                            </div>
                            <div>
                                {errors.destino && <span>{errors.destino.message}</span>}
                            </div>
                        </div>

                        {/* Dias */}
                        <div id='divs-errores'>
                            <div id="inputformlista">
                                <span id="icon"><img src={calendar_img} alt='logo' width={"25px"}></img></span>
                                <input id="input" placeholder="Nº días" type='number'
                                    {...register("dias", {
                                        required: {
                                            value: true,
                                            message: "Nº días requerido"
                                        }
                                    })}
                                ></input>
                            </div>
                            <div>
                                {errors.dias && <span>{errors.dias.message}</span>}
                            </div>
                        </div>

                        {/* Personas */}
                        <div id='divs-errores'>
                            <div id="inputformlista">
                                <span id="icon"><img src={people_img} alt='logo' width={"25px"}></img></span>

                                <input id="input" placeholder="Nº personas" type='number'
                                    {...register("personas", {
                                        required: {
                                            value: true,
                                            message: "Nº personas requerido"
                                        }
                                    })}
                                ></input>
                            </div>
                            <div>
                                {errors.personas && <span>{errors.personas.message}</span>}
                            </div>
                        </div>


                        <div id='divpresupuestostop'>
                            <h5>Presupuesto</h5>
                            {/* Presupuesto Mínimo */}
                            <div id='divs-errores'>
                                <div id='divpresupuestos'>
                                    <div id="inputformlista">
                                        <input id="input" placeholder="Mínimo" type='number'
                                            {...register("precio", {
                                                required: {
                                                    value: true,
                                                    message: "Mínimo requerido"
                                                }
                                            })}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    {errors.pre_min && <span>{errors.pre_min.message}</span>}
                                </div>

                            </div>


                        </div>

                    </div>
                    {/* BOTON */}
                    <button type='submit' id='boton-subir'>Empezar</button>
                </form>

                {HaBuscado && (
                    <div className='CrearContainer'>

                        {Array.from({ length: datosItinerario.dias }).map((_, index) => (
                            <div key={index} className='day-input'>
                                <input type='text' placeholder={`Título día ${index + 1}`} />
                                <textarea name="textarea" rows="10" cols="50" placeholder='Escribir...'></textarea>

                            </div>
                        ))}
                        <h5>Añade una etiqueta para completar tu itinerario</h5>
                        <input type='text'></input>

                    </div>

                )}
                {HaBuscado && (
                    <MapContainer center={[40.40, -3.70]} zoom={13} id='map' ref={mapRef}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <MapClickHandler />
                        {markers.map(marker => (
                            <Marker key={marker.id} position={marker.position} icon={MarkerIcon} onclick={() => handleDeleteMarker(marker.id)}>
                                <Popup>
                                    <div>
                                        <p>{marker.title}</p>
                                        <button onClick={() => handleDeleteMarker(marker.id)}>Borrar</button>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                        {tempMarker && (
                            <Marker position={tempMarker.position} icon={tempMarkerIcon}>
                                <Popup>
                                    <div>
                                        <input
                                            type="text"
                                            value={tempMarker.title}
                                            onChange={(e) => handleMarkerTitleChange(e.target.value)}
                                            placeholder='Título del marcador'
                                        />
                                        <button onClick={handleSaveMarker}>Guardar</button>
                                    </div>
                                </Popup>
                            </Marker>
                        )}
                    </MapContainer>
                )}
            </div >



            <div className='publicidad'>
                <img src={publi} alt='publi'></img>

            </div>
        </div >
    )
}


export default SubirComponent;