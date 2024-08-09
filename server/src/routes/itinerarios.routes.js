import { Router } from "express";

import {buscarItinerarios,getItinerario,getTextosItinerariosLimite,
getMisItinerarios,getItinerariosAleatorios,getFavoritos,addFav,borrarFav,subirItinerario, 
subirTextoItinerario,borrarItinerario,getTextosItinerarios_sin_limite,comprobarIti_Usuario,
updateTextoItinerario, calcularCentroPoligono_y_coordenadas} from "../controllers/itinerarios.controller.js"


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
router.post("/getItinerariosAleatorios" , getItinerariosAleatorios);
router.post("/buscarItinerarios" , buscarItinerarios);
router.get("/getItinerario/:id" , getItinerario);
router.get("/getTextosItinerariosLimite/:id" , getTextosItinerariosLimite);
router.get("/getTextosItinerarios_sin_limite/:id" , getTextosItinerarios_sin_limite);
router.post("/getMisItinerarios" , getMisItinerarios);
router.post("/getFavoritos" , getFavoritos);
router.post("/addFav" , addFav);
router.post("/borrarFav" , borrarFav);
router.post("/subirItinerario" ,fileUpload, subirItinerario);
router.post("/updateTextoItinerario", updateTextoItinerario);
router.post("/subirTextoItinerario", subirTextoItinerario);
router.post("/borrarItinerario", borrarItinerario);
router.post("/comprobarIti_Usuario", comprobarIti_Usuario);
router.post("/calcularCentroPoligono_y_coordenadas", calcularCentroPoligono_y_coordenadas);



  
export default router