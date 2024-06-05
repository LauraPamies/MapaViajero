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



    // const todasEtiquetas = ['Todo',...new Set(itinerarios.map(itinerario => itinerario.etiqueta))]
    // console.log(todasEtiquetas);

    const [orden, setOrden] = useState('');

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
        } else {
            //SI ESTÁ LOGUEADO
            console.log(localStorage.getItem('userId'));
            console.log(localStorage.getItem('userName'));
            console.log(localStorage.getItem('userEmail'));
            console.log(localStorage.getItem('isLoggedIn'));

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

    const filtrarEtiquetas = (etiqueta) =>{
        if(etiqueta === 'Todo') {
            const itinerariosFiltrados = itinerariosPrincipio.filter(itinerario => itinerario.etiqueta.trim() !== '');
            setItinerarios(itinerariosFiltrados);
            return 
        }

        const itinerariosFiltrados = itinerariosPrincipio.filter(itinerario => itinerario.etiqueta === etiqueta);
        setItinerarios(itinerariosFiltrados);

    }

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        var orden = "";

        try {
            const response = await axios.post('http://localhost:3050/ItinerariosConcretos', data);
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



                <div className='etiquetas'>
                    {Etiquetas.map(etiqueta=>(
                        <label key={etiqueta}>
                        <input 
                        type="radio" 
                        value={etiqueta} 
                        name="etiqueta"
                        onClick={()=> filtrarEtiquetas(etiqueta)}
                        />
                            {etiqueta}
                            </label>
                    ))}
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



            <div className='publicidad'>
                <img src={publi} alt='publi'></img>

            </div>
        </div >
    )
}


export default ListasComponent;