import { pool } from "../db.js";



export const getItinerarios = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES

        // throw new Error('sample') //MANDAR ERRORES DE PRUEBA

        console.log("Select * from itinerarios");

        const [result] = await pool.query("Select * from itinerarios")

        res.send(result);

        
    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}