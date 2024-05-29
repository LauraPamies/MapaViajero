import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import publi_hori from '../images/publi_horizontal.png';
import publi from '../images/Publi.png';
import '../CSS/itinerarioInfo.css';



const IitinerarioInfo = () => {
    const { id } = useParams(); //Accede a los parámetros de la url
    const [itinerario, setItinerario] = useState(null);
    const [textosItinerario, setTextoItinerario] = useState([]);

    axios.defaults.baseURL = 'http://localhost:3050';

    useEffect(() => {

        axios.get(`/itinerario/${id}`)
            .then(response => {
                setItinerario(response.data);

                axios.get(`/textosItinerarioslimite/${id}`)
                    .then(response => {
                        console.log(response.data);
                        setTextoItinerario(response.data);
                    })
                    .catch(error => {
                        console.error('Error mostrando itinerario:', error);
                    });
            })
            .catch(error => {
                console.error('Error mostrando itinerario:', error);
            });
    }, [id]);



    if (!itinerario) {
        return <div>Cargando...</div>;
    }

    return (
        <div className='itinerariosdiv'>
            <div className='publicidad1'>
                <img src={publi} alt='publi'></img>
            </div>

            <div className='infoItinerario'>


                <h1>{itinerario.titulo}</h1>
                <p>{itinerario.dias} días</p>
                <p>{itinerario.personas} personas</p>
                <p>{itinerario.precio}€</p>
                <p>{itinerario.name}</p>
                <p>{itinerario.etiquetas}</p>


                <div className="textos-container">
                    {textosItinerario.map((texto, index) => (
                        <div key={texto.num_dia} className="texto-card">

                            <h2>{texto.num_dia} - {texto.titulo_dia}</h2>
                            <p>{texto.texto_dia} días</p>

                        </div>
                    ))}
                </div>

                <img src={publi_hori} alt='publi' style={{ filter: 'blur(3px)' }}></img>
            </div>
            <div className='publicidad2'>
                <img src={publi} alt='publi'></img>

            </div>

        </div>



    );
}

export default IitinerarioInfo;
