import React, { useEffect, useState } from 'react';

import '../CSS/register.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useLocation } from 'react-router-dom';

import '../CSS/misitinerarios.css';
import publi from '../images/Publi.png';

import { useForm } from "react-hook-form";
import chat from '../images/chat_icon.png';




const MapaComponent = () => {

    const navigate = useNavigate();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    const query = useQuery();
    const destino = query.get('destino');
    const dias = query.get('dias');
    const personas = query.get('personas');
    const min = query.get('min');
    const max = query.get('max');

    useEffect(() => {

        if (localStorage.getItem('isLoggedIn') !== 'true') { //SI NO ESTÁ LOGUEADO
            navigate("/login");
        }

    }, []);





    return (
        <div className='MisItinerariosdiv'>
            <div className='publicidad'>
                <img src={publi} alt='publi'></img>
            </div>

            <div className='contenidoMisItinerarios'>

                <h1>Mapa</h1>
                {destino && <p>Destino: {destino}</p>}
                {dias && <p>Días: {dias}</p>}
                {personas && <p>Personas: {personas}</p>}
                {min && <p>Min: {min}</p>}
                {max && <p>Max: {max}</p>}


            </div>

            <div className='publicidad'>
                <img src={publi} alt='publi'></img>

            </div>
        </div >
    )
}


export default MapaComponent;