import { Router } from "express";

import {ItinerariosConcretos,itinerario,textosItinerarioslimite,
misItinerarios,getItinerariosRandom,favoritos,addFav,borrarFav,subirItinerario, 
subirTextoItinerario,borrarItinerario,textosItinerarios_sin_limite,comprobarIti_Usuario} from "../controllers/itinerarios.controller.js"


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
// router.post("/getItinerarios" , getItinerarios);
router.post("/getItinerariosRandom" , getItinerariosRandom);
router.post("/ItinerariosConcretos" , ItinerariosConcretos);
router.get("/itinerario/:id" , itinerario);
router.get("/textosItinerarioslimite/:id" , textosItinerarioslimite);
router.get("/textosItinerarios_sin_limite/:id" , textosItinerarios_sin_limite);
router.post("/misItinerarios" , misItinerarios);
router.post("/favoritos" , favoritos);
router.post("/addFav" , addFav);
router.post("/borrarFav" , borrarFav);
router.post("/subirItinerario" ,fileUpload, subirItinerario);
router.post("/subirTextoItinerario", subirTextoItinerario);
router.post("/borrarItinerario", borrarItinerario);
router.post("/comprobarIti_Usuario", comprobarIti_Usuario);



  
export default router