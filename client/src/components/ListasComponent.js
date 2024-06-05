import React, { useEffect, useState } from 'react';

import '../CSS/register.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";

import '../CSS/listas.css';
import publi from '../images/Publi.png';

import { useForm } from "react-hook-form";



const ListasComponent = () => {

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

    const [Etiquetas, setEtiquetas] = useState(['Todo']);



    const navigate = useNavigate();
    //FORMULARIO
    const { register, handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm()


    useEffect(() => {

        if (localStorage.getItem('isLoggedIn') !== 'true') { //SI NO ESTÁ LOGUEADO
            navigate("/login");
        }

        async function fetchData() {
            try {
                const response = await axios.post('http://localhost:3050/getItinerarios', {
                    orden: ""
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

    const handleItinerarioClick = (id) => {

        navigate(`/itinerario/${id}`);
    };

    const orden_cambiado = (async (event) => {

        //Cada vez que el orden cambie hace otra petición
        if (HaBuscado === true) {
            try {
                const response = await axios.post('http://localhost:3050/ItinerariosConcretos', {
                    destino: datosBusqueda.destino,
                    dias: datosBusqueda.dias,
                    personas: datosBusqueda.personas,
                    pre_min: datosBusqueda.pre_min,
                    pre_max: datosBusqueda.pre_max,
                    orden: event.target.value
                });
                setItinerarios(response.data);
                SetitinerariosPrincipio(response.data);//Duplica el array para que haya uno que los tenga todos siempre(el itinerariosPrincipio) y otro con los filtrados

            } catch (error) {
                console.error('Error al obtener los itinerarios:', error);
            }
        }
        else {
            try {
                const response = await axios.post('http://localhost:3050/getItinerarios', {
                    orden: event.target.value
                });
                setItinerarios(response.data);
                SetitinerariosPrincipio(response.data);//Duplica el array para que haya uno que los tenga todos siempre(el itinerariosPrincipio) y otro con los filtrados


            } catch (error) {
                console.error('Error al obtener los itinerarios:', error);
            }
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
                orden: ""
            });
            setItinerarios(response.data);
            SetitinerariosPrincipio(response.data);//Duplica el array para que haya uno que los tenga todos siempre(el itinerariosPrincipio) y otro con los filtrados

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
                                {/* <span id="icons"><img src={usericon} alt='logo' width={"50px"}></img></span> */}
                                <input id="input" placeholder="Destino" type='text'
                                    {...register("destino", {
                                        required: {
                                            value: true,
                                            message: "Destino requerido"
                                        }
                                    })}
                                ></input>
                            </div>
                            <div>
                                {errors.destino && <span>{errors.destino.message}</span>}
                            </div>
                        </div>

                        {/* Dias */}
                        <div id='divs-errores'>
                            <div id="inputformlista">
                                {/* <span id="icons"><img src={usericon} alt='logo' width={"50px"}></img></span> */}
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
                                {/* <span id="icons"><img src={usericon} alt='logo' width={"50px"}></img></span> */}
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
                            <div id='contenedorpresupuestos'>
                                <div id='divs-errores'>
                                    <div id='divpresupuestos'>
                                        <div id="inputformlista">
                                            <input id="input" placeholder="Mínimo" type='number'
                                                {...register("pre_min", {
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

                                <div id='divs-errores'>
                                    {/* Presupuesto Máximo */}
                                    <div id='divs-errores'>
                                        <div id="inputformlista">
                                            <input id="input" placeholder="Máximo" type='number'
                                                {...register("pre_max", {
                                                    required: {
                                                        value: true,
                                                        message: "Máximo requerido"
                                                    }
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

                <button id='botonmapa' onClick={ir_mapa}>Ver mapa</button>

                <div className='filtros_y_itinerarios'>

                    <div className='filtros_container'>
                        <h4>Ordenar por</h4>
                        <select className='orden_select' onChange={orden_cambiado}>
                            {opciones_ordenar.map(opcion => (
                                <option value={opcion.value}>{opcion.label}</option>
                            ))}
                        </select>
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
                            <div key={itinerario.id} className="itinerario-card" onClick={() => handleItinerarioClick(itinerario.id)}
                                style={{ cursor: 'pointer' }}>
                                {/* <img src={itinerario.foto} alt={itinerario.titulo} className="itinerario-imagen" /> */}
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
                                        <p className="itinerario-autor">{itinerario.name}</p>


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