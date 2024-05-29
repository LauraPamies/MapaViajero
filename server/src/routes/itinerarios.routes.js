import { Router } from "express";

import {getItinerarios,ItinerariosConcretos,itinerario} from "../controllers/itinerarios.controller.js"

const router = Router()

//DEFINIMOS LOS ENDPOINTS
router.post("/getItinerarios" , getItinerarios);
router.post("/ItinerariosConcretos" , ItinerariosConcretos);
router.get("/itinerario/:id" , itinerario);



  
export default router