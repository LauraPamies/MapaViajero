import { pool } from "../db.js";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const subirImagen = async (req, res) => {
    try {
        // Accedemos al archivo subido
        console.log(req.file);

        if (!req.file) {
            return res.status(400).json({ message: "No se ha subido ningún archivo" });
        }

        const tipo = req.file.mimetype;
        const nombre = req.file.originalname;
        const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename));

        console.log("INSERT INTO imagenes (tipo, nombre, data) VALUES ('" + tipo + "', '" + nombre + "', [data]);");
        const [result] = await pool.query("INSERT INTO imagenes (tipo, nombre, data) VALUES (?, ?, ?)", [tipo, nombre, data]);

        res.send("Imagen guardada");
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Algo fue mal"
        });
    }
};


export const sacarImagen = async (req, res) => {
    // try {

    //     console.log("SELECT * FROM imagenes;");
    //     const [result] = await pool.query("SELECT * FROM imagenes;");

    //     result.map(img =>{
    //         fs.writeFileSync(path.join(__dirname, '../dbimagenes/' + img.id + '.png'),img.data)

    //     })

    //     // res.json(result);
    //     const imagenesdir = fs.readdirSync(path.join(__dirname, '../dbimagenes/'));
    //     res.json(imagenesdir);
    //     console.log(imagenesdir);

    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({
    //         message: "Algo fue mal"
    //     });
    // }

    const { itinerarios } = req.body;

    // Array para almacenar las rutas de las imágenes correspondientes a los itinerarios
    const imagenes = [];

    // Iterar sobre los IDs de los itinerarios y obtener las rutas de las imágenes
    itinerarios.forEach(itinerarioId => {
        // Supongamos que las imágenes se encuentran en una carpeta 'imagenes' con nombres que incluyen el ID del itinerario
        const imagePath = `./imagenes/${itinerarioId}`; // Ajusta la extensión de la imagen según tu configuración
        console.log(imagePath);
        // Verificar si la imagen existe
        if (fs.existsSync(imagePath)) {
            // Agregar la ruta de la imagen al array de imágenes
            imagenes.push(imagePath);
        } else {
            console.error(`No se encontró una imagen para el itinerario con ID ${itinerarioId}`);
            // Enviar una ruta de imagen predeterminada o una respuesta vacía si no se encuentra la imagen
            // imagenes.push('ruta/de/imagen/predeterminada.jpg');
        }
    });

    // Enviar las rutas de las imágenes como respuesta
    res.json({ imagenes });
};