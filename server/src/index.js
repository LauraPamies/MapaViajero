import express from 'express'
import cors from "cors"
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';



//IMPORTAMOS LAS RUTAS
import usuarios_routes from "./routes/usuarios.routes.js"
import itinerarios_routes from "./routes/itinerarios.routes.js"
import prediccion_router from "./routes/prediccion.routes.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json()); //PARA PODER INTERPRETAR LOS DATOS JSON
app.use(cors()); //ESTO ES IMPORTANTE PARA QUE DESDE EL CLIENTE SE PUEDA PEDIR SOLICITUD SIN PROBLEMAS
app.use(express.static(path.join(__dirname, 'dbimagenes')));

//USAMOS LAS RUTAS IMPORTADAS
app.use(usuarios_routes)
app.use(itinerarios_routes)
app.use(prediccion_router)
// app.use("Nombre de archivo rutas")


//UNA RUTA PARA CUANDO PONEMOS UN ENDPOINT QUE NO EXISTE
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint Not found'
    })
})


app.listen(3050,()=>{
    console.log("Corriendo SERVIDOR en el puerto 3050");
})

