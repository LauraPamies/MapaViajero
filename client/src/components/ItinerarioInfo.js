import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import publi_hori from '../images/publi_horizontal.png';
import publi from '../images/Publi.png';
import '../CSS/itinerarioInfo.css';
import chat from '../images/chat_icon.png';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { pdf, Document, Page, Text, View, Image, PDFViewer } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// LEAFLET
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from "leaflet";
import 'leaflet/dist/leaflet.css';
import "leaflet.heat";

const IitinerarioInfo = () => {
    const { id } = useParams(); //Accede a los parámetros de la url
    const [itinerario, setItinerario] = useState(null);
    const [EsAutor, setEsAutor] = useState(false);
    const [textosItinerario, setTextoItinerario] = useState([]);
    const [puntoMedio, setPuntoMedio] = useState({ x: 0, y: 0 });
    const [coordenadas, setCoordenadas] = useState([]);
    const mapRef = useRef(null);
    const [pdfFileName, setPdfFileName] = useState('nombre_archivo.pdf');

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

        cargarCoordenadas();

    }, [id, navigate, EsAutor]);


    const cargarCoordenadas = async () => {
        try {
            const response = await axios.post('http://localhost:3050/calcularCentroPoligono_y_coordenadas', {
                id_itinerario: id
            });
            console.log('Coordenadas response:', response.data);
            setPuntoMedio(response.data.puntoMedio);
            setCoordenadas(response.data.coordenadas);
        } catch (error) {
            console.error('Error mostrando coordenadas:', error);
        }
    };

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
            setTextoItinerario(response.data);
        } catch (error) {
            console.error('Error mostrando textos como usuario:', error);
        }
    };

    if (!itinerario) {
        return <div>Comprueba si el enlace es válido...</div>;
    }

    const handleBotonDescargar = () => {

        navigate(`/infoPDF/${id}`);
    };

    const handleDownload = async () => {
        const doc = (
            <Document>
                <Page size='A4'>
                    <View>
                        <View className='infoItinerario'>
                            <View
                                className='itinerario-card'
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    backgroundColor: 'lightgray',
                                    borderRadius: '8px',
                                    padding: '20px 0',
                                    marginBottom: '20px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                }}
                            >
                                <Text id='titulo'
                                    style={{
                                        fontSize: '30px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        padding: '10px 30px 0 0'
                                    }}
                                >{itinerario.titulo}</Text>
                                <Text style={{
                                    fontSize: '25px',
                                    fontWeight: '500',
                                    padding: '10px 20px 0 0'
                                }}
                                >{itinerario.dias} días</Text>
                                <Text style={{
                                    fontSize: '25px',
                                    fontWeight: '500',
                                    padding: '10px 20px 0 0'
                                }}
                                >{itinerario.personas} personas</Text>
                                <Text
                                    style={{
                                        color: '#46AF12',
                                        fontSize: '25px',
                                        fontWeight: '500',
                                        paddingLeft: '20px',
                                        paddingTop: '10px'
                                    }}
                                >{itinerario.precio}€</Text>
                            </View>

                            <View className='textos-container'>
                                {textosItinerario.map((texto, index) => (
                                    <View key={index}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: '30px'
                                        }}>

                                        <Text
                                            style={{
                                                fontSize: '25px',
                                                fontWeight: 'bold',
                                                textDecoration: 'underline',
                                                marginBottom: '20px'
                                            }}
                                        >
                                            {texto.num_dia} - {texto.titulo_dia}
                                        </Text>
                                        <Text>{texto.texto_dia}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        );

        const asPdf = pdf(doc);
        const blob = await asPdf.toBlob();
        saveAs(blob, pdfFileName);
    };

    return (
        <div className='itinerariosdiv'>

            <div className='publicidad1'>
                <img src={publi} alt='publi'></img>
            </div>


            <div className='infoItinerario'>
                <div className="itinerario-card-info">
                    <p id='titulo-info'>{itinerario.titulo}</p>
                    <p id='personas_dias-info'>{itinerario.dias} días</p>
                    <p id='personas_dias-info'>{itinerario.personas} personas</p>
                    <p className='itinerario-precio-info'>{itinerario.precio}€</p>
                </div>




                {/* <button id='empieza' onClick={() => handleBotonDescargar()}>Descargar</button> */}
                <button id='empieza' onClick={handleDownload}>Descargar</button>

                {puntoMedio && coordenadas.length > 0 ? (
                    <MapContainer center={[puntoMedio.y, puntoMedio.x]} zoom={13} id='map-info' ref={mapRef}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Polygon positions={coordenadas.map(coord => [coord.y, coord.x])} />
                    </MapContainer>
                ) : (
                    <div>Loading map...</div>
                )}


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
