import { pool } from "../db.js";



export const getItinerarios = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES

        // throw new Error('sample') //MANDAR ERRORES DE PRUEBA

        console.log(req.body);
        const { orden } = req.body;
        //SI RECIBE PRECIO ASCENDENTE
        if (orden == "precio_asc") {
            console.log("select iti.id,titulo,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by precio ASC;");
            const [result] = await pool.query("select iti.id,titulo,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by precio ASC;")

            res.send(result);
        }

        //SI RECIBE PRECIO DESCENDENTE
        else if (orden == "precio_des") {
            console.log("select iti.id,titulo,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by precio DESC;");
            const [result] = await pool.query("select iti.id,titulo,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by precio DESC;")

            res.send(result);
        }

        //SI RECIBE FECHA ASCENDENTE
        else if (orden == "fecha_asc") {
            console.log("select iti.id,titulo,fecha,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by fecha ASC;");
            const [result] = await pool.query("select iti.id,titulo,fecha,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by fecha ASC;")

            res.send(result);
        }

        //SI RECIBE FECHA DESCENDENTE
        else if (orden == "fecha_des") {
            console.log("select iti.id,titulo,fecha,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by fecha DESC;");
            const [result] = await pool.query("select iti.id,titulo,fecha,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by fecha DESC;")

            res.send(result);
        }

        else {
            console.log("select iti.id,titulo,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id;");

            const [result] = await pool.query("select iti.id,titulo,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id;")

            res.send(result);
        }





    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}


export const ItinerariosConcretos = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES

        // throw new Error('sample') //MANDAR ERRORES DE PRUEBA

        console.log(req.body);
        const { destino, dias, personas, pre_min, pre_max } = req.body;
        //SI RECIBE PRECIO ASCENDENTE
        console.log("Select iti.id,titulo,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE titulo = '" + destino + "' AND dias = '" + dias + "' AND personas = '" + personas + "' AND precio between '" + pre_min + "' AND '" + pre_max + "';");
        const [result] = await pool.query("Select iti.id,titulo,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE titulo = ? AND dias = ? AND personas = ? AND precio between ? AND ? ;", [destino, dias, personas, pre_min, pre_max])


        res.send(result);


    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}

export const itinerario = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES

        // throw new Error('sample') //MANDAR ERRORES DE PRUEBA
        const id = req.params.id;
        console.log(id);

        console.log("select iti.id,titulo,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE iti.id = " + id + ";");
        const [result] = await pool.query("select iti.id,titulo,foto,etiquetas,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE iti.id = ?;",[id])
        
        console.log(result[0]);
        res.send(result[0]);


    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}

export const textosItinerarioslimite = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES

        // throw new Error('sample') //MANDAR ERRORES DE PRUEBA
        const id = req.params.id;
        console.log(id);

        console.log("select num_dia,titulo_dia,texto_dia from itinerarios AS iti INNER JOIN textositinerarios AS textos ON iti.id=textos.id_itinerario WHERE iti.id = " + id + " ORDER BY num_dia LIMIT 2;");
        const [result] = await pool.query("select num_dia,titulo_dia,texto_dia from itinerarios AS iti INNER JOIN textositinerarios AS textos ON iti.id=textos.id_itinerario WHERE iti.id = ? ORDER BY num_dia LIMIT 2;",[id])
        
        res.send(result);


    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}




