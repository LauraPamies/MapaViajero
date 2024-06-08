import { Router } from "express";

import {getItinerarios,ItinerariosConcretos,itinerario,textosItinerarioslimite, misItinerarios,getItinerariosRandom,favoritos,addFav,borrarFav} from "../controllers/itinerarios.controller.js"

const router = Router()

//DEFINIMOS LOS ENDPOINTS
router.post("/getItinerarios" , getItinerarios);
router.post("/getItinerariosRandom" , getItinerariosRandom);
router.post("/ItinerariosConcretos" , ItinerariosConcretos);
router.get("/itinerario/:id" , itinerario);
router.get("/textosItinerarioslimite/:id" , textosItinerarioslimite);
router.post("/misItinerarios" , misItinerarios);
router.post("/favoritos" , favoritos);
router.post("/addFav" , addFav);
router.post("/borrarFav" , borrarFav);



  
export default router