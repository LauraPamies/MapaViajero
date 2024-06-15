import React, { useEffect, useState } from 'react';
import axios from "axios";
import publi_hori from '../images/publi_horizontal.png';
import publi from '../images/Publi.png';
import '../CSS/itinerarioInfo.css';
import chat from '../images/chat_icon.png';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';





const IitinerarioInfo = () => {
    const { id } = useParams(); //Accede a los parámetros de la url
    const [itinerario, setItinerario] = useState(null);
    const [EsAutor, setEsAutor] = useState(false);
    const [textosItinerario, setTextoItinerario] = useState([]);

    const navigate = useNavigate();


    axios.defaults.baseURL = 'http://localhost:3050';

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem('isLoggedIn') !== 'true') { // Si no está logueado
                navigate("/login");
            } else {
                try {
                    const itinerarioResponse = await axios.get(`/itinerario/${id}`);
                    setItinerario(itinerarioResponse.data);
                    comprobarCreador(itinerarioResponse.data);

                    if (EsAutor) {
                        await obtenerTextosComoAutor(id);
                    } else {
                        await obtenerTextosComoUsuario(id);
                    }
                } catch (error) {
                    console.error('Error mostrando itinerario:', error);
                }
            }
        };

        fetchData();
    }, [id, navigate, EsAutor]);

    const comprobarCreador = (itinerarioData) => {
        var user_id = localStorage.getItem('userId');
        if (user_id == itinerarioData.autor_id) {
            setEsAutor(true);
        }
    };

    const obtenerTextosComoAutor = async (id) => {
        try {
            const response = await axios.get(`/textosItinerarios_sin_limite/${id}`);

            console.log(response.data);
            setTextoItinerario(response.data);
        } catch (error) {
            console.error('Error mostrando textos como autor:', error);
        }
    };

    const obtenerTextosComoUsuario = async (id) => {
        try {
            const response = await axios.get(`/textosItinerarioslimite/${id}`);
            console.log(response.data);
            setTextoItinerario(response.data);
        } catch (error) {
            console.error('Error mostrando textos como usuario:', error);
        }
    };

    if (!itinerario) {
        return <div>Cargando...</div>;
    }

    return (
        <div className='itinerariosdiv'>

            <div className='publicidad1'>
                <img src={publi} alt='publi'></img>
            </div>


            <div className='infoItinerario'>
                <div id='resumen-chat'>
                    <div className="itinerario-card">
                        <p id='titulo'>{itinerario.titulo}</p>
                        <p id='personas_dias'>{itinerario.dias} días</p>
                        <p id='personas_dias'>{itinerario.personas} personas</p>
                        <p className='itinerario-precio'>{itinerario.precio}€</p>
                    </div>


                    <img id="chat" src={chat} alt='chat'></img>
                </div>



                <Link to=""><button id='empieza'>Descargar</button></Link>


                <div className="textos-container">
                    {textosItinerario.map((texto, index) => (
                        <div key={texto.num_dia} className="texto-card">

                            <h2 id='titulos_dia'>{texto.num_dia} - {texto.titulo_dia}</h2>
                            <p>{texto.texto_dia}</p>

                        </div>
                    ))}
                </div>

                {!EsAutor && (
                    <img src={publi_hori} alt='publi' style={{ filter: 'blur(3px)' }}></img>
                )}
            </div>

            <div className='publicidad1'>
                <img src={publi} alt='publi'></img>
            </div>


        </div>



    );
}

export default IitinerarioInfo;
