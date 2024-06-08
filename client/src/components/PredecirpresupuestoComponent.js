// import React from 'react';
import React, { useEffect } from 'react';

import { Link, Navigate, useNavigate } from 'react-router-dom';

import '../CSS/predecirpresupuesto.css';
import publi from '../images/Publi.png';
import imgizq from '../images/image5.png';
import imgder from '../images/image2.png';

import place from '../images/Place.png';
import people from '../images/People35.png';
import Calendar35 from '../images/calendar35.png';




const PredecirpresupuestoComponent = () => {

    const navigate = useNavigate();


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



    return (
        <div className='Predecirdiv'>
            <div className='publicidad'>
                <img src={publi} alt='publi'></img>
            </div>

            <div className='contenidopubli'>
                <div className='textospubli'>
                    <h1>PREDECIR PRESUPUESTO</h1>
                    <h3>Prepárate para tu próxima aventura: Descubre fácilmente el presupuesto estimado para tus futuros viajes.</h3>
                </div>
                <div className='formpublidiv'>
                    <div id='imagenpubli1'>
                        <img src={imgizq} alt='publi'></img>
                    </div>
                    <div id='formpubli'>
                        {/* LUGAR */}
                        <div id="inputform">
                            <span id="iconform"><img src={place} alt='logo' width={"50px"}></img></span>
                            <input id="inputs" type="text" placeholder="Lugar ..." />
                        </div>

                        {/* VIAJEROS */}
                        <div id="inputform">
                            <span id="iconform"><img src={people} alt='logo' width={"50px"}></img></span>
                            <input id="inputs" type="number" placeholder="Número de viajeros ..." />
                        </div>

                        {/* DIAS */}
                        <div id="inputform">
                            <span id="iconform"><img src={Calendar35} alt='logo' width={"50px"}></img></span>
                            <input id="inputs" type="number" placeholder="Número de días ..." />
                        </div>

                        <div>
                            <button id='botonpredecir'>Predecir</button>
                        </div>


                    </div>
                    <div id='imagenpubli2'>
                        <img src={imgder} alt='publi'></img>
                    </div>
                </div>
            </div>
            <div className='publicidad'>
                <img src={publi} alt='publi'></img>

            </div>

        </div>
    )
}


export default PredecirpresupuestoComponent;