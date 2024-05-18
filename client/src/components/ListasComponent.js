import React, { useEffect, useState } from 'react';

import '../CSS/register.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";

import '../CSS/listas.css';
import publi from '../images/Publi.png';

import { useForm } from "react-hook-form";


const ListasComponent = () => {

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

    const onSubmit = handleSubmit((data) => {
        console.log(data);

    })

    return (
        <div className='Listasdiv'>
            <div className='publicidad1'>
                <img src={publi} alt='publi'></img>
            </div>

            <div className='contenidoListas'>
                <form onSubmit={onSubmit} id='formularioreg'>

                    {/* Destino */}
                    <div id="inputformreg">
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


                    {/* Dias */}
                    <div id="inputformreg">
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


                    {/* Personas */}
                    <div id="inputformreg">
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

                    {/* Presupuesto Mínimo */}
                    <div id="inputformreg">
                        <input id="input" placeholder="Mínimo" type='number'
                            {...register("pre_min", {
                                required: {
                                    value: true,
                                    message: "Mínimo requerido"
                                }
                            })}
                        ></input>
                    </div>
                    <div>
                        {errors.pre_min && <span>{errors.pre_min.message}</span>}
                    </div>


                    {/* Presupuesto Máximo */}
                    <div id="inputformreg">
                        <input id="input" placeholder="Máximo" type='number'
                            {...register("pre_max", {
                                required: {
                                    value: true,
                                    message: "Máximo requerido"
                                }
                            })}
                        ></input>
                    </div>
                    <div>
                        {errors.pre_max && <span>{errors.pre_max.message}</span>}
                    </div>


                    {/* BOTON */}
                    <button type='submit' id='botonItinerarios'>Buscar itinerarios</button>


                </form>


                <button  id='botonItinerarios'>Ver mapa</button>

                <div id='itinerarios'>

                </div>
            </div>
            <div className='publicidad2'>
                <img src={publi} alt='publi'></img>

            </div>
        </div>
    )
}


export default ListasComponent;