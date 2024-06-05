import { Router } from "express";

import {getItinerarios,ItinerariosConcretos,itinerario,textosItinerarioslimite, misItinerarios,getItinerariosRandom} from "../controllers/itinerarios.controller.js"

const router = Router()

//DEFINIMOS LOS ENDPOINTS
router.post("/getItinerarios" , getItinerarios);
router.post("/getItinerariosRandom" , getItinerariosRandom);
router.post("/ItinerariosConcretos" , ItinerariosConcretos);
router.get("/itinerario/:id" , itinerario);
router.get("/textosItinerarioslimite/:id" , textosItinerarioslimite);
router.post("/misItinerarios" , misItinerarios);



  
export default router