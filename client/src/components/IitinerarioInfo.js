import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";


const IitinerarioInfo = () => {
    const { id } = useParams(); //Accede a los parámetros de la url
    const [itinerario, setItinerario] = useState(null);
    axios.defaults.baseURL = 'http://localhost:3050';

    useEffect(() => {
 
        axios.get(`/itinerario/${id}`)
          .then(response => {
            setItinerario(response.data);
          })
          .catch(error => {
            console.error('Error fetching itinerary:', error);
          });
      }, [id]);

      

    if (!itinerario) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{itinerario.titulo}</h1>
            <p>{itinerario.dias} días</p>
            <p>{itinerario.personas} personas</p>
            <p>{itinerario.precio}€</p>
            <p>{itinerario.name}</p>
            <p>{itinerario.etiquetas}</p>
        </div>
    );
}

export default IitinerarioInfo;
