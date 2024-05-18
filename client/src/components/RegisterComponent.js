import React, { useState } from 'react';
import '../CSS/register.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";


//IMPORT NOTIFICACIONES
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// IMPORT IMAGENES
import logo from '../images/logo.png';
import mailicon from '../images/Mail.png';
import usericon from '../images/Userregistro.png';
import passicon from '../images/Password.png';
import imgregistro from '../images/imgregistro.png';


import { useForm } from "react-hook-form";


const noti = withReactContent(Swal)



const RegisterComponent = () => {

    //MOSTRAR / OCULTAR CONTRASEÑAS
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
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

    const onSubmit = handleSubmit((data) => {
        console.log(data);

        //AQUI VA LA PETICION AL SERVIDOR
        axios.post("http://localhost:3050/registro", data)
            .then(res => {
                console.log(res.data);
                if (res.data != "") { //COMPROBAMOS QUE HAY DATOS EN LA RESPUESTA DEL SERVIDOR, OSEA QUE SI EXISTE EL USUARIO
                    noti.fire({
                        title: <strong>Registro exitoso!!</strong>,
                        html: <i>El usuario {data.name} fue registrado correctamente</i>,
                        icon: 'success',
                        timer: 2000
                    });
                    navigate("/login");

                } else {
                    noti.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "No se logró crear al usuario!",
                        footer: "Pruebe con otro correo"
                    })
                }
            })
            .catch(error =>
                noti.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No se logró crear al usuario!",
                    footer: "Pruebe con otro correo o intentelo más tarde"
                })
            )
        reset() //vacia los campos del formulario
    })

    const navigate = useNavigate();


    return (
        <div className='Register'>
            <div className='bloques' id='bloqueizqreg'>
                <img id="imagen" src={imgregistro} alt='imgregistro'></img>
            </div>


            <div className='bloques' id='bloquederreg'>
                <div id='logo'>
                    <div ><Link to="/"><img src={logo} alt='logo'></img></Link></div>

                </div>

                <div >
                    <h2 id='texto'>REGISTRARSE</h2>

                </div>

                <form onSubmit={onSubmit} id='formularioreg'>

                    {/* USUARIO */}
                    <div id="inputformreg">
                        <span id="icons"><img src={usericon} alt='logo' width={"50px"}></img></span>
                        <input id="input" placeholder="Usuario ..." type='text'
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Nombre requerido"
                                },
                                minLength: {
                                    value: 2,
                                    message: "El nombre debe tener al menos 2 caracteres"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "El nombre debe tener como máximo 20 caracteres"
                                }
                            })}
                        ></input>
                    </div>
                    <div>
                        {errors.name && <span>{errors.name.message}</span>}
                    </div>

                    {/* CORREO */}
                    <div id="inputformreg">
                        <span id="icons"><img src={mailicon} alt='logo' width={"50px"}></img></span>
                        <input id="input" placeholder="Email ..." type='email'
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Correo requerido"
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Correo no válido"
                                }
                            })}
                        ></input>
                    </div>
                    <div>
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>



                    {/* CONTRASEÑA */}
                    <div id="inputformreg">
                        <span id="icons"><img src={passicon} alt='logo' width={"50px"}></img></span>
                        <input id="input" placeholder="Contraseña ..." 
                        type={showPassword ? 'text' : 'password'} 
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Contraseña requerida"
                                },
                                minLength: {
                                    value: 6,
                                    message: "La contraseña debe tener al menos 6 caracteres"
                                }

                            })}
                        ></input>
                    </div>
                    <div>
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>




                    {/* CONFIRMAR CONTRASEÑA */}
                    <div id="inputformreg">
                        <span id="icons"><img src={passicon} alt='logo' width={"50px"}></img></span>
                        <input id="input" placeholder="Confirmar contraseña ..." 
                        type={showPassword ? 'text' : 'password'} 
                            {...register("confpassword", {
                                required: {
                                    value: true,
                                    message: "Confirmar contraseña es requerido"
                                },
                                validate: value => value === watch("password") || "Las contraseñas no coinciden"
                            })}
                        ></input>
                    </div>
                    <div>
                        {errors.confpassword && <span>{errors.confpassword.message}</span>}
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

                    {/* BOTON */}
                    <button type='submit' id='botonregistro'>Registro</button>

                    {/* REGISTRARSE */}
                    <a href="/login" id="sesion">Iniciar sesión</a>
                </form>



            </div>
        </div>
    );

}

export default RegisterComponent;