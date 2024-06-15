import React, { useEffect, useState, useRef } from 'react';

import '../CSS/register.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";

// LEAFLET
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polygon } from 'react-leaflet';
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

import { faHeartCircleMinus, faL } from '@fortawesome/free-solid-svg-icons'

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

    const [HaBuscado, setHaBuscado] = useState(false);
    const navigate = useNavigate();
    const [datosItinerario, setDatosItinerario] = useState([]);
    const mapRef = useRef(null);
    const [markers, setMarkers] = useState([]);
    const [tempMarker, setTempMarker] = useState(null);
    const [file, setFile] = useState(null);
    const [listaimagenes, setListaimagenes] = useState([]);
    const [etiqueta, setEtiqueta] = useState('');
    // Estado para almacenar las coordenadas del polígono
    const [coordenadasPoligono, setCoordenadasPoligono] = useState([]);


    useEffect(() => {   //AL CARGAR LA PÁGINA

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
        setDatosItinerario(data);
        setHaBuscado(true);
    });

    const subirItinerario = async () => {
        console.log(etiqueta);
        console.log(file);
        console.log(coordenadasPoligono);

        if (!datosItinerario.destino || !datosItinerario.dias || !datosItinerario.personas || !datosItinerario.precio || !etiqueta || !file || (coordenadasPoligono.length === 0)) {
            alert('Debes completar todos los campos');
            return;
        }
        const currentDate = new Date();

        // Obtenemos el año, mes y día por separado
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Sumamos 1 al mes ya que los meses van de 0 a 11
        const day = String(currentDate.getDate()).padStart(2, '0');

        // Formateamos la fecha en el formato YYYY-MM-DD
        const formattedDate = `${year}-${month}-${day}`;
        const coordenadasWKT = convertirACoordenadasWKT(coordenadasPoligono);
        // Crear un objeto con los datos a enviar
        // const datosEnviar = {
        //     destino: datosItinerario.destino,
        //     fecha: formattedDate,
        //     dias: datosItinerario.dias,
        //     personas: datosItinerario.personas,
        //     precio: datosItinerario.precio,
        //     autor_id: localStorage.getItem('userId'),
        //     etiqueta: etiqueta,
        //     file: file
        //     // diasInfo: Array.from({ length: datosItinerario.dias }).map((_, index) => ({
        //     //     titulo: document.getElementById(`titulo-dia-${index}`).value,
        //     //     texto: document.getElementById(`texto-dia-${index}`).value
        //     // }))
        // };

        const formData = new FormData();
        formData.append('destino', datosItinerario.destino);
        formData.append('fecha', formattedDate);
        formData.append('dias', datosItinerario.dias);
        formData.append('personas', datosItinerario.personas);
        formData.append('precio', datosItinerario.precio);
        formData.append('autor_id', localStorage.getItem('userId'));
        formData.append('etiqueta', etiqueta.toLowerCase());
        formData.append('image', file);
        formData.append('coordenadas', coordenadasWKT);


        try {
            // Realizar la petición para enviar los datos del itinerario
            const responseItinerario = await axios.post('http://localhost:3050/subirItinerario', formData);
            const itinerarioId = responseItinerario.data.insertId; // Obtener el ID del itinerario insertado

            {
                Array.from({ length: datosItinerario.dias }).map(async (_, index) => {
                    try {
                        const tituloDia = document.getElementById(`titulo-dia-${index}`).value;
                        const textoDia = document.getElementById(`texto-dia-${index}`).value;

                        const responseItinerario = await axios.post('http://localhost:3050/subirTextoItinerario', {
                            num_dia: index + 1,
                            titulo_dia: tituloDia,
                            texto_dia: textoDia,
                            id_itinerario: itinerarioId
                        });

                    } catch (error) {
                        console.error('Error al subir el texto:', error);
                        alert('Error al subir el texto');
                    }
                })
            }

            alert('Itinerario subido con éxito');
        } catch (error) {
            // Si ocurre un error, mostrar un mensaje de error
            console.error('Error al subir el itinerario:', error);
            alert('Error al subir el itinerario');
        }
        document.getElementById('fileinput').value = null;
        setFile(null);
    }

    const handleEtiquetaChange = (e) => {
        setEtiqueta(e.target.value); // Actualizar el estado de etiqueta con el valor del input
    };

    const elegirFoto = e => {
        // console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }


    const MapClickHandler = () => {
        useMapEvents({
            click: handleClickMapa,
        });
        return null;
    };
    // Función para manejar el clic en el mapa cuando se está dibujando el polígono
    const handleClickMapa = (e) => {
            // Agrega la posición del clic a las coordenadas del polígono
            setCoordenadasPoligono([...coordenadasPoligono, e.latlng]);
            // Si se han agregado cuatro puntos, detén el dibujo del polígono
            if (coordenadasPoligono.length === 4) {
                resetPoligono();
            }
        
    };

    // Función para dibujar el polígono en el mapa
    const dibujarPoligono = () => {
        return (
            <Polygon positions={coordenadasPoligono} color="red" />
        );
    };

    const resetPoligono = () => {
        setCoordenadasPoligono([]);
    };

    const convertirACoordenadasWKT = (coordenadas) => {
        const wkt = `POLYGON((${coordenadas.map(coordenada => `${coordenada.lng} ${coordenada.lat}`).join(',')},${coordenadas[0].lng} ${coordenadas[0].lat}))`;
        return wkt;
    };


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
                                <input id="input" placeholder="Nº días" type='number' min="1"
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

                                <input id="input" placeholder="Nº personas" type='number' min="1"
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
                            {/* Presupuesto Mínimo */}
                            <div id='divs-errores'>
                                <div id='divpresupuestos'>
                                    <div id="inputformlista">
                                        <input id="input" placeholder="Precio" type='number' min="1"
                                            {...register("precio", {
                                                required: {
                                                    value: true,
                                                    message: "Precio requerido"
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
                    <div className='diasContainer'>
                        {Array.from({ length: datosItinerario.dias }).map((_, index) => (
                            <div key={index} className='day-input'>
                                <input type='text' placeholder={`Título día ${index + 1}`} id={`titulo-dia-${index}`} />
                                <textarea name="textarea" rows="10" cols="100" placeholder='Escribir...' id={`texto-dia-${index}`}></textarea>
                            </div>
                        ))}
                    </div>

                )}
                {HaBuscado && (
                    <div id='segundapartesubir'>
                        <button onClick={resetPoligono} id='resetearPoligono'>
                            Resetear polígono
                        </button>
                        <p>Haz click en el mapa para crear un polígono de 4 puntos de tu zona</p>
                        <MapContainer center={[40.40, -3.70]} zoom={13} id='map' ref={mapRef} >
                        <MapClickHandler />

                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {dibujarPoligono()}

                        </MapContainer>
                        <h5>Añade una etiqueta para completar tu itinerario</h5>
                        <input
                            type="text"
                            value={etiqueta}
                            id='input-etiqueta'
                            onChange={handleEtiquetaChange}
                        />
                        <h5>Añade una foto</h5>

                        <input id='fileinput' onChange={elegirFoto} type='file'></input>

                        <button onClick={subirItinerario} id='boton-subir'>Subir itinerario</button>

                    </div>
                )}

                <div>

                    {/* <button onClick={enviarFoto} type='button'>Subir</button> */}
                </div>

                {/* <div>
                    {listaimagenes.map(image =>(
                        <div key={image}>
                        <img src={'http://localhost:3050/' + image} style={{height: "200px",width:"300px"}}></img>
                    </div>
                    ))}
                    
                </div> */}

            </div >



            <div className='publicidad'>
                <img src={publi} alt='publi'></img>

            </div>
        </div >
    )
}


export default SubirComponent;