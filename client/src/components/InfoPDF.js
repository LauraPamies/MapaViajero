import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {pdf, Document, Page, Text, View, Image, PDFViewer } from '@react-pdf/renderer';
import { useParams, useNavigate } from 'react-router-dom';

const InfoPDF = () => {
    const { id } = useParams();
    const [itinerario, setItinerario] = useState(null);
    const [textosItinerario, setTextoItinerario] = useState([]);
    const navigate = useNavigate();
    const [pdfFileName, setPdfFileName] = useState('nombre_archivo.pdf');


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (localStorage.getItem('isLoggedIn') !== 'true') {
                    navigate("/login");
                } else {
                    const itinerarioResponse = await axios.get(`http://localhost:3050/itinerario/${id}`);
                    setItinerario(itinerarioResponse.data);
                    const tituloItinerario = itinerarioResponse.data.titulo;
                    setPdfFileName(`${tituloItinerario}.pdf`);
                    await obtenerTextosComoAutor(id);
                    
                }
            } catch (error) {
                console.error('Error mostrando itinerario:', error);
            }
        };

        fetchData();
    }, [id, navigate]);


    const obtenerTextosComoAutor = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3050/textosItinerarios_sin_limite/${id}`);
            setTextoItinerario(response.data);
        } catch (error) {
            console.error('Error mostrando textos como autor:', error);
        }
    };

    if (!itinerario) {
        return <div>Cargando...</div>;
    }

    return (
        <PDFViewer style={{ width: '100%', height: '95vh' }} fileName={pdfFileName}>
            <Document>
                <Page size='A4'>
                    <View className='itinerariosdiv' style={{ backgroundColor: 'lightgray' }}>
                        <View className='infoItinerario'>
                            <View
                                className='itinerario-card'
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                }}
                            >
                                <Text id='titulo'>{itinerario.titulo}</Text>
                                <Text id='personas_dias'>{itinerario.dias} días</Text>
                                <Text id='personas_dias'>{itinerario.personas} personas</Text>
                                <Text className='itinerario-precio'>{itinerario.precio}€</Text>
                            </View>
                            
                            <View className='textos-container'>
                                {textosItinerario.map((texto, index) => (
                                    <View key={index} className='texto-card'>
                                        <Text id='titulos_dia'>{texto.num_dia} - {texto.titulo_dia}</Text>
                                        <Text>{texto.texto_dia}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default InfoPDF;
