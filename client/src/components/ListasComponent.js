import React, { useEffect, useState } from 'react';

import '../CSS/register.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";

import '../CSS/listas.css';
import publi from '../images/Publi.png';

//IMPORT NOTIFICACIONES
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faHeart, faHeartCircleMinus, faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons'

// IMPORT IMAGENES
import destino_img from '../images/Location.png';
import calendar_img from '../images/Calendar.png';
import people_img from '../images/People.png';
import map_img from '../images/Map.png';

const ListasComponent = () => {

    const noti = withReactContent(Swal)


    const ir_mapa = () => {

        navigate("/mapa");

    };

    const opciones_ordenar = [
        { label: "Mas barato primero", value: "precio_asc" },
        { label: "Mas caro primero", value: "precio_desc" },
        { label: "Mas nuevos primero", value: "fecha_desc" },
        { label: "Mas antiguos primero", value: "fecha_asc" }
    ]

    const [HaBuscado, setHaBuscado] = useState(false);

    const [datosBusqueda, setDatosBusqueda] = useState([]);
    const [itinerarios, setItinerarios] = useState([]);
    const [itinerariosPrincipio, SetitinerariosPrincipio] = useState([]);
    const [imagenes, setImagenes] = useState([]);
    

    const [favoritos, setFavoritos] = useState([]);

    const [Etiquetas, setEtiquetas] = useState(['Todo']);


    const navigate = useNavigate();
    //FORMULARIO
    const { register, handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm()

    const pre_min = watch('pre_min');
    const pre_max = watch('pre_max');


    useEffect(() => {   //AL CARGAR LA PÁGINA

        if (localStorage.getItem('isLoggedIn') !== 'true') { //SI NO ESTÁ LOGUEADO
            navigate("/login");
        }

        async function fetchData() {
            try {
                const response = await axios.post('http://localhost:3050/getItinerariosRandom');
                setItinerarios(response.data.itinerarios);
                SetitinerariosPrincipio(response.data.itinerarios);//Duplica el array para que haya uno que los tenga todos siempre(el itinerariosPrincipio) y otro con los filtrados
                setImagenes(response.data.imagenes);

            } catch (error) {
                console.error('Error al obtener los itinerarios:', error);
            }
        }

        fetchData();
        cargarFavs();

    }, []);

    useEffect(() => {
        const todasEtiquetas = ['Todo', ...new Set(itinerariosPrincipio.map(itinerario => itinerario.etiqueta))];
        setEtiquetas(todasEtiquetas);
    }, [itinerariosPrincipio]);


    async function cargarFavs() {
        var id_usuario = localStorage.getItem('userId');
        try {
            const response = await axios.post('http://localhost:3050/favoritos', {
                id_usuario: id_usuario
            });
            setFavoritos(response.data.itinerarios);


        } catch (error) {
            console.error('Error al obtener los itinerarios:', error);
        }
    }
    const handleItinerarioClick = (id) => {

        navigate(`/itinerario/${id}`);
    };

    const borrarFav = (id_itinerario) => {
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

    const borrarFavAceptado = (async (id_itinerario) => {
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

    const addFav = (async (id_itinerario) => {
        var id_usuario = localStorage.getItem('userId');

        try {
            const response = await axios.post('http://localhost:3050/addFav', {
                id_itinerario: id_itinerario,
                id_usuario: id_usuario
            });
            cargarFavs();


        } catch (error) {
            console.error('Error al añadir a favorito:', error);
        }
    });

    const orden_cambiado = (async (event) => {


        try {
            const response = await axios.post('http://localhost:3050/ItinerariosConcretos', {
                destino: datosBusqueda.destino,
                dias: datosBusqueda.dias,
                personas: datosBusqueda.personas,
                pre_min: datosBusqueda.pre_min,
                pre_max: datosBusqueda.pre_max,
                orden: event.target.value
            });
            setItinerarios(response.data.itinerarios);
            SetitinerariosPrincipio(response.data.itinerarios);//Duplica el array para que haya uno que los tenga todos siempre(el itinerariosPrincipio) y otro con los filtrados
            setImagenes(response.data.imagenes);
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

    const onSubmit = handleSubmit(async (data) => {
        setDatosBusqueda(data);
        setHaBuscado(true);
        try {
            const response = await axios.post('http://localhost:3050/ItinerariosConcretos', {
                destino: data.destino,
                dias: data.dias,
                personas: data.personas,
                pre_min: data.pre_min,
                pre_max: data.pre_max,
                orden: "precio_asc"
            });
            setItinerarios(response.data.itinerarios);
            SetitinerariosPrincipio(response.data.itinerarios);//Duplica el array para que haya uno que los tenga todos siempre(el itinerariosPrincipio) y otro con los filtrados
            setImagenes(response.data.imagenes);
        } catch (error) {
            console.error('Error al obtener los itinerarios:', error);
        }

    });



    return (
        <div className='Listasdiv'>
            <div className='publicidad'>
                <img src={publi} alt='publi'></img>
            </div>

            <div className='contenidoListas'>

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
                            <h5>Presupuesto</h5>
                            {/* Presupuesto Mínimo */}
                            <div id='contenedorpresupuestos'>
                                <div id='divs-errores'>
                                    <div id='divpresupuestos'>
                                        <div id="inputformlista">
                                            <input id="input" placeholder="Mínimo" type='number' min="1"
                                                {...register("pre_min", {
                                                    required: {
                                                        value: true,
                                                        message: "Mínimo requerido"
                                                    },
                                                    validate: value =>
                                                        value <= pre_max || "El valor no puede ser superior al máximo."
                                                })}
                                            ></input>
                                        </div>
                                    </div>
                                    <div>
                                        {errors.pre_min && <span>{errors.pre_min.message}</span>}
                                    </div>

                                </div>

                                <div id='divs-errores'>
                                    {/* Presupuesto Máximo */}
                                    <div id='divs-errores'>
                                        <div id="inputformlista">
                                            <input id="input" placeholder="Máximo" type='number' min="1"
                                                {...register("pre_max", {
                                                    required: {
                                                        value: true,
                                                        message: "Máximo requerido"
                                                    },
                                                    validate: value =>
                                                        value >= pre_min || "El valor no puede ser inferior al mínimo."

                                                })}
                                            ></input>
                                        </div>
                                    </div>


                                    <div>
                                        {errors.pre_max && <span>{errors.pre_max.message}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* BOTON */}
                        <button type='submit' id='botonItinerarios'>Buscar itinerarios</button>

                    </div>
                </form>

                <button id='botonmapa' onClick={ir_mapa}>
                    <img src={map_img} alt='logo' width={"25px"}></img>
                    Ver mapa
                </button>


                <div className='filtros_y_itinerarios'>
                    <div className='filtros_container'>

                        {HaBuscado && (
                            <div>

                                <h4>Ordenar por</h4>
                                <select className='orden_select' onChange={orden_cambiado}>
                                    {opciones_ordenar.map(opcion => (
                                        <option value={opcion.value}>{opcion.label}</option>
                                    ))}
                                </select>
                            </div>
                        )}
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
                            <div key={itinerario.id} id='itinerario-card-complete'>
                                <div className="itinerario-card" >
                                    <div className="image-container">
                                        <img
                                            src={`http://localhost:3050/${imagenes[index]}`}
                                            alt={imagenes.titulo}
                                            className="itinerario-imagen"
                                        />
                                    </div>
                                    <div className="itinerario-info" onClick={() => handleItinerarioClick(itinerario.id)} style={{ cursor: 'pointer' }}>
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
                                        {
                                            favoritos.some(fav => fav.id_itinerario === itinerario.id) ? (
                                                <button onClick={() => borrarFav(itinerario.id)} id='fav-icon-red'><FontAwesomeIcon icon={faHeartCircleMinus} /></button>

                                            ) : (
                                                <button onClick={() => addFav(itinerario.id)} id='fav-icon' ><FontAwesomeIcon icon={faHeartCirclePlus} /></button>
                                            )
                                        }
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


export default ListasComponent;