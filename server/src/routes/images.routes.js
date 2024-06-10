import { Router } from "express";
import { subirImagen, sacarImagen } from "../controllers/images.controller.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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

const router = Router();

// DEFINIMOS LOS ENDPOINTS
router.post("/subirImagen", fileUpload, subirImagen);

router.post("/sacarImagen", sacarImagen);

export default router;
