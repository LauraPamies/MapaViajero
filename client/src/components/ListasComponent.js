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

    const [itinerarios, setItinerarios] = useState([]);

    const navigate = useNavigate();
    //FORMULARIO
    const { register, handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm({
        // defaultValues: {
        //     name : "Longa",
        //     password :123456
        // }
    })


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
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        try {
            const response = await axios.get('http://localhost:3050/getItinerarios');
            setItinerarios(response.data);
        } catch (error) {
            console.error('Error al obtener los itinerarios:', error);
        }

    })

    return (
        <div className='Listasdiv'>
            <div className='publicidad1'>
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


                <div className="itinerarios-container">
                    {itinerarios.map((itinerario, index) => (
                        <div key={index} className="itinerario-card">
                            {/* <img src={itinerario.foto} alt={itinerario.titulo} className="itinerario-imagen" /> */}
                            <img
              src={`${process.env.PUBLIC_URL}/fotos_itinerarios/${itinerario.foto.split('/').pop()}`}
              alt={itinerario.titulo}
              className="itinerario-imagen"
            />
                            <div className="itinerario-info">
                                <h2 className="itinerario-titulo">{itinerario.titulo}</h2>
                                <p>{itinerario.dias} días</p>
                                <p>{itinerario.personas} personas</p>
                                <p className="itinerario-precio">{itinerario.precio}€</p>
                                <p className="itinerario-autor">{itinerario.autor_id}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



            <div className='publicidad2'>
                <img src={publi} alt='publi'></img>

            </div>
        </div >
    )
}


export default ListasComponent;