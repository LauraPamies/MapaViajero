import { Router } from "express";

import {getItinerarios,ItinerariosConcretos,itinerario,textosItinerarioslimite, misItinerarios,getItinerariosRandom,favoritos,addFav,borrarFav,subirItinerario} from "../controllers/itinerarios.controller.js"


import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        // Obtener la extensión del archivo
        const ext = path.extname(file.originalname);
        // Obtener el nombre del archivo sin la extensión
        const basename = path.basename(file.originalname, ext);
        // Concatenar la fecha actual y la extensión del archivo original
        const uniqueSuffix = Date.now() + ext;
        cb(null, basename + '-' + uniqueSuffix);
    }
});

const fileUpload = multer({
    storage: diskstorage
}).single('image');

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
router.post("/subirItinerario" ,fileUpload, subirItinerario);



  
export default router