import { Router } from "express";

import {getItinerarios} from "../controllers/itinerarios.controller.js"

const router = Router()

//DEFINIMOS LOS ENDPOINTS
router.get("/getItinerarios" , getItinerarios);

  
export default router