import { Router } from "express";

import {getItinerarios,ItinerariosConcretos,itinerario,textosItinerarioslimite} from "../controllers/itinerarios.controller.js"

const router = Router()

//DEFINIMOS LOS ENDPOINTS
router.post("/getItinerarios" , getItinerarios);
router.post("/ItinerariosConcretos" , ItinerariosConcretos);
router.get("/itinerario/:id" , itinerario);
router.get("/textosItinerarioslimite/:id" , textosItinerarioslimite);



  
export default router