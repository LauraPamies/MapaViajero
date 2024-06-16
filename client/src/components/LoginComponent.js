import React, { useState, useEffect } from 'react';
import '../CSS/login.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";

//IMPORT NOTIFICACIONES
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// IMPORT IMAGENES
import mapa from '../images/mapa.png';
import logo from '../images/logo.png';
import mailicon from '../images/Mail.png';
import passicon from '../images/Password.png';
import google from '../images/Google.png';
import twitter from '../images/TwitterX.png';
import facebook from '../images/Facebook.png';

import { useForm } from "react-hook-form";

const noti = withReactContent(Swal)



const LoginComponent = () => {

    //MOSTRAR / OCULTAR CONTRASEÑAS
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const navigate = useNavigate();

    // const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado

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


    // Verificar si hay una sesión activa al cargar el componente
    //SE LLAMA DESPUÉS DE RENDERIZAR EL COMPONENTE
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            navigate("/listas");
        }
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        console.log("Datos del formulario: " + JSON.stringify(data));
        try {
            const res = await axios.post("http://localhost:3050/login", data);
            console.log(res.data);
            //     // Guarda los datos de sesión en el almacenamiento local
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userId', res.data.id);
                localStorage.setItem('userName', res.data.name);
                localStorage.setItem('userEmail', res.data.email);
                navigate("/listas");
           
        } catch (error) {
            noti.fire({
                icon: "error",
                title: "Oops...",
                text: "El correo o la contraseña no son válidos."
            });
        }
    });




    return (
        <div className='Login'>
            <div className='bloque' id='bloqueizq'>
                <img id="mapa" src={mapa} alt='mapa'></img>
            </div>


            <div className='bloque' id='bloqueder'>
                <div id='logo'>
                    <div ><Link to="/"><img src={logo} alt='logo' ></img></Link></div>

                </div>

                <div >
                    <h2 id='texto'>INICIAR SESIÓN</h2>

                </div>

                <form onSubmit={onSubmit} id='formulario'>
                    {/* CORREO */}
                    <div id="inputform">
                        <span id="icons"><img src={mailicon} alt='logo' width={"50px"}></img></span>
                        <input id="inputs" placeholder="Email ..." type='email'
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Correo requerido"
                                }
                            })}
                        ></input>
                    </div>
                    <div>
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>

                    {/* CONTRASEÑA */}
                    <div id="inputform">
                        <span id="icons"><img src={passicon} alt='logo' width={"50px"}></img></span>
                        <input id="inputs" placeholder="Contraseña ..."
                            type={showPassword ? 'text' : 'password'}
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Contraseña requerida"
                                }

                            })}
                        ></input>
                    </div>
                    <div>
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>

                    <label htmlFor="showPassword" id='mostrarpass'>
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={handleShowPassword}
                        />
                        Mostrar contraseña
                    </label>


                    {/* OLVIDAR CONTRASEÑA */}
                    {/* <a id="olvidar" >Olvidé mi contraseña</a> */}
                    
                    

                    {/* REDES SOCIALES */}
                    <div id='redes'>
                        <img className="iconredes" src={google} alt='logo' width={"82px"}></img>
                        <img className="iconredes" src={facebook} alt='logo' width={"82px"}></img>
                        <img className="iconredes" src={twitter} alt='logo' width={"82px"}></img>
                    </div>
                    {/* BOTON */}
                    <button type='submit' id='botonlogin'>Iniciar sesión</button>

                    {/* REGISTRARSE */}
                    <a href="/registro" id="registrolink">Registrarse</a>
                </form>
            </div>
        </div>
    );
}

export default LoginComponent;
