import { pool } from "../db.js";



export const getItinerarios = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES

        // throw new Error('sample') //MANDAR ERRORES DE PRUEBA

        console.log(req.body);
        const { orden } = req.body;
         //SI RECIBE PRECIO ASCENDENTE
        if (orden == "precio_asc")
        {
            console.log("select titulo,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by precio ASC;");
            const [result] = await pool.query("select titulo,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by precio ASC;")

            res.send(result);
        }

        //SI RECIBE PRECIO DESCENDENTE
        else if (orden == "precio_des") 
        {
            console.log("select titulo,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by precio DESC;");
            const [result] = await pool.query("select titulo,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by precio DESC;")

            res.send(result);
        }

        //SI RECIBE FECHA ASCENDENTE
        else if (orden == "fecha_asc") 
        {
            console.log("select titulo,fecha,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by fecha ASC;");
            const [result] = await pool.query("select titulo,fecha,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by fecha ASC;")

            res.send(result);
        }

        //SI RECIBE FECHA DESCENDENTE
        else if (orden == "fecha_des") 
        {
            console.log("select titulo,fecha,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by fecha DESC;");
            const [result] = await pool.query("select titulo,fecha,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by fecha DESC;")

            res.send(result);
        }

        else{
            console.log("select titulo,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id;");

            const [result] = await pool.query("select titulo,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id;")
    
            res.send(result);
        }

        



    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}





