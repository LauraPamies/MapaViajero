import { Router } from "express";

import {getItinerarios} from "../controllers/itinerarios.controller.js"

const router = Router()

//DEFINIMOS LOS ENDPOINTS
router.post("/getItinerarios" , getItinerarios);


  
export default router