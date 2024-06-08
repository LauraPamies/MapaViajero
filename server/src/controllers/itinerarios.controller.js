import { pool } from "../db.js";


//TODOS LOS ITINERARIOS
export const getItinerarios = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES

        // throw new Error('sample') //MANDAR ERRORES DE PRUEBA

        console.log(req.body);
        const { orden } = req.body;
        //SI RECIBE PRECIO ASCENDENTE
        if (orden == "precio_asc") {
            console.log("select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by precio ASC;");
            const [result] = await pool.query("select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by precio ASC;")

            res.send(result);
        }

        //SI RECIBE PRECIO DESCENDENTE
        else if (orden == "precio_desc") {
            console.log("select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by precio DESC;");
            const [result] = await pool.query("select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by precio DESC;")

            res.send(result);
        }

        //SI RECIBE FECHA ASCENDENTE
        else if (orden == "fecha_asc") {
            console.log("select iti.id,titulo,fecha,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by fecha ASC;");
            const [result] = await pool.query("select iti.id,titulo,fecha,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by fecha ASC;")

            res.send(result);
        }

        //SI RECIBE FECHA DESCENDENTE
        else if (orden == "fecha_desc") {
            console.log("select iti.id,titulo,fecha,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by fecha DESC;");
            const [result] = await pool.query("select iti.id,titulo,fecha,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by fecha DESC;")

            res.send(result);
        }

        else {
            console.log("select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id;");

            const [result] = await pool.query("select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id;")

            res.send(result);
        }





    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}


export const getItinerariosRandom = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES



        console.log("select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id ORDER BY RAND() LIMIT 3;");

        const [result] = await pool.query("select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id ORDER BY RAND() LIMIT 3;")

        res.send(result);


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
        const { destino, dias, personas, pre_min, pre_max, orden } = req.body;
        //SI RECIBE PRECIO ASCENDENTE
        if (orden == "precio_asc") {
            console.log("Select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE titulo = '" + destino + "' AND dias = '" + dias + "' AND personas = '" + personas + "' AND precio between '" + pre_min + "' AND '" + pre_max + "' order by precio ASC;");
            const [result] = await pool.query("Select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE titulo = ? AND dias = ? AND personas = ? AND precio between ? AND ? order by precio ASC;", [destino, dias, personas, pre_min, pre_max])


            res.send(result);
        }

        //SI RECIBE PRECIO DESCENDENTE
        else if (orden == "precio_desc") {
            console.log("Select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE titulo = '" + destino + "' AND dias = '" + dias + "' AND personas = '" + personas + "' AND precio between '" + pre_min + "' AND '" + pre_max + "' order by precio DESC;");
            const [result] = await pool.query("Select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE titulo = ? AND dias = ? AND personas = ? AND precio between ? AND ? order by precio DESC;", [destino, dias, personas, pre_min, pre_max])


            res.send(result);
        }

        //SI RECIBE FECHA ASCENDENTE
        else if (orden == "fecha_asc") {
            console.log("Select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE titulo = '" + destino + "' AND dias = '" + dias + "' AND personas = '" + personas + "' AND precio between '" + pre_min + "' AND '" + pre_max + "' order by fecha ASC;");
            const [result] = await pool.query("Select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE titulo = ? AND dias = ? AND personas = ? AND precio between ? AND ? order by fecha ASC;", [destino, dias, personas, pre_min, pre_max])


            res.send(result);
        }

        //SI RECIBE FECHA DESCENDENTE
        else if (orden == "fecha_desc") {
            console.log("Select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE titulo = '" + destino + "' AND dias = '" + dias + "' AND personas = '" + personas + "' AND precio between '" + pre_min + "' AND '" + pre_max + "' order by fecha DESC;");
            const [result] = await pool.query("Select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE titulo = ? AND dias = ? AND personas = ? AND precio between ? AND ? order by fecha DESC;", [destino, dias, personas, pre_min, pre_max])


            res.send(result);
        }
        else {
            console.log("Select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE titulo = '" + destino + "' AND dias = '" + dias + "' AND personas = '" + personas + "' AND precio between '" + pre_min + "' AND '" + pre_max + "' ;");
            const [result] = await pool.query("Select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE titulo = ? AND dias = ? AND personas = ? AND precio between ? AND ? ;", [destino, dias, personas, pre_min, pre_max])


            res.send(result);
        }


    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}
//ITINERARIO POR ID de ITINERARIO
export const itinerario = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES

        // throw new Error('sample') //MANDAR ERRORES DE PRUEBA
        const id = req.params.id;
        console.log(id);

        console.log("select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE iti.id = " + id + ";");
        const [result] = await pool.query("select iti.id,titulo,foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE iti.id = ?;", [id])

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
        const [result] = await pool.query("select num_dia,titulo_dia,texto_dia from itinerarios AS iti INNER JOIN textositinerarios AS textos ON iti.id=textos.id_itinerario WHERE iti.id = ? ORDER BY num_dia LIMIT 2;", [id])

        res.send(result);


    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}

export const misItinerarios = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES

        // throw new Error('sample') //MANDAR ERRORES DE PRUEBA

        console.log(req.body);
        const { autor_id } = req.body;
        //SI RECIBE PRECIO ASCENDENTE
        console.log("Select * itinerarios  WHERE autor_id = '" + autor_id + "';");
        const [result] = await pool.query("Select * from itinerarios WHERE autor_id = ?;", [autor_id])


        res.send(result);


    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}


export const favoritos = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES
        console.log(req.body);
        const { id_usuario } = req.body;
        //SI RECIBE PRECIO ASCENDENTE
        console.log("select * from itinerarios AS iti INNER JOIN favoritos AS fav ON iti.id = fav.id_itinerario WHERE fav.id_usuario = '" + id_usuario + "';");
        const [result] = await pool.query("select * from itinerarios AS iti INNER JOIN favoritos AS fav ON iti.id = fav.id_itinerario WHERE fav.id_usuario = ?;", [id_usuario])


        res.send(result);


    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}

export const addFav = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES
        console.log(req.body);
        const { id_itinerario, id_usuario } = req.body;
        //SI RECIBE PRECIO ASCENDENTE
        console.log("INSERT INTO favoritos (id_usuario, id_itinerario) VALUES ('" + id_usuario + "', '" + id_itinerario + "');");


        const [result] = await pool.query("INSERT INTO favoritos (id_usuario, id_itinerario) VALUES (?, ?);", [id_usuario,id_itinerario]);


        res.send(result);


    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}

export const borrarFav = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES
        console.log(req.body);
        const { id_itinerario, id_usuario } = req.body;

        console.log("delete from favoritos WHERE id_usuario = '" + id_usuario + "' AND id_itinerario = '" + id_itinerario + "';");
        const [result] = await pool.query("delete from favoritos WHERE id_usuario = ? AND id_itinerario = ?;", [id_usuario,id_itinerario]);


        res.send(result);


    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}





