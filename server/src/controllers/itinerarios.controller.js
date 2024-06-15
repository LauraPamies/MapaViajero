import { pool } from "../db.js";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// //TODOS LOS ITINERARIOS
// export const getItinerarios = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
//     try { //MANEJO DE ERRORES

//         // throw new Error('sample') //MANDAR ERRORES DE PRUEBA

//         console.log(req.body);
//         const { orden } = req.body;
//         //SI RECIBE PRECIO ASCENDENTE
//         if (orden == "precio_asc") {
//             console.log("select iti.id,titulo,nombre_foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by precio ASC;");
//             const [result] = await pool.query("select iti.id,titulo,nombre_foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by precio ASC;")

//             res.send(result);
//         }

//         //SI RECIBE PRECIO DESCENDENTE
//         else if (orden == "precio_desc") {
//             console.log("select iti.id,titulo,nombre_foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by precio DESC;");
//             const [result] = await pool.query("select iti.id,titulo,nombre_foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by precio DESC;")

//             res.send(result);
//         }

//         //SI RECIBE FECHA ASCENDENTE
//         else if (orden == "fecha_asc") {
//             console.log("select iti.id,titulo,fecha,nombre_foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by fecha ASC;");
//             const [result] = await pool.query("select iti.id,titulo,fecha,nombre_foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by fecha ASC;")

//             res.send(result);
//         }

//         //SI RECIBE FECHA DESCENDENTE
//         else if (orden == "fecha_desc") {
//             console.log("select iti.id,titulo,fecha,nombre_foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by fecha DESC;");
//             const [result] = await pool.query("select iti.id,titulo,fecha,nombre_foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id  order by fecha DESC;")

//             res.send(result);
//         }

//         else {
//             console.log("select iti.id,titulo,nombre_foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id;");

//             const [result] = await pool.query("select iti.id,titulo,nombre_foto,etiqueta,dias,personas,precio,name from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id;")

//             res.send(result);
//         }





//     } catch (error) {
//         return res.status(500).json({
//             message: "Algo fue mal"
//         })
//     }

// }


export const getItinerariosRandom = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES



        console.log("select iti.id,titulo,etiqueta,dias,personas,precio,name, nombre_foto, data from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id ORDER BY RAND() LIMIT 3;");

        const [result] = await pool.query("select iti.id,titulo,etiqueta,dias,personas,precio,name, nombre_foto, data from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id ORDER BY RAND() LIMIT 3;")


        result.map(img => {
            fs.writeFileSync(path.join(__dirname, '../dbimagenes/' + img.nombre_foto), img.data)

        })

        res.send(result);

        // if (result.length === 0) {
        //     // No se encontraron resultados, devolver arreglos vacíos
        //     return res.json({ itinerarios: [], imagenes: [] });
        // }

        // // Array para almacenar los nombres de archivo de las imágenes asociadas a los itinerarios
        // let imagenesdir = [];

        // Iterar sobre los itinerarios recuperados


        // // Respuesta con los itinerarios y las imágenes asociadas
        // const response = {
        //     itinerarios: result,
        //     imagenes: imagenesdir
        // };

        // // Envía la respuesta con la información combinada
        // res.json(response);


    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}

export const ItinerariosConcretos = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try {
        console.log(req.body);
        const { destino, dias, personas, pre_min, pre_max, orden } = req.body;

        let query = "";
        let params = [];

        if (orden === "precio_asc") {
            query = "select iti.id,titulo,nombre_foto,etiqueta,dias,personas,precio,name, nombre_foto, data from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE titulo = ? AND dias = ? AND personas = ? AND precio between ? AND ? order by precio ASC;"
            params = [destino, dias, personas, pre_min, pre_max];
        } else if (orden === "precio_desc") {
            query = "select iti.id,titulo,nombre_foto,etiqueta,dias,personas,precio,name, nombre_foto, data from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE titulo = ? AND dias = ? AND personas = ? AND precio between ? AND ? order by precio DESC;"
            params = [destino, dias, personas, pre_min, pre_max];
        } else if (orden === "fecha_asc") {
            query = "select iti.id,titulo,nombre_foto,etiqueta,dias,personas,precio,name, nombre_foto, data from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE titulo = ? AND dias = ? AND personas = ? AND precio between ? AND ? order by fecha ASC;"
            params = [destino, dias, personas, pre_min, pre_max];
        } else if (orden === "fecha_desc") {
            query = "select iti.id,titulo,nombre_foto,etiqueta,dias,personas,precio,name, nombre_foto, data from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE titulo = ? AND dias = ? AND personas = ? AND precio between ? AND ? order by fecha DESC;"
            params = [destino, dias, personas, pre_min, pre_max];
        } else {
            query = "select iti.id,titulo,nombre_foto,etiqueta,dias,personas,precio,name, nombre_foto, data from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE titulo = ? AND dias = ? AND personas = ? AND precio between ? AND ? ;"
            params = [destino, dias, personas, pre_min, pre_max];
        }

        const [result] = await pool.query(query, params);

        result.map(img => {
            fs.writeFileSync(path.join(__dirname, '../dbimagenes/' + img.nombre_foto), img.data)

        })

        res.send(result);

    } catch (error) {
        console.error('Error en la consulta:', error);
        // Manejo del error y devolución de respuesta apropiada
        res.status(500).json({ message: 'Ocurrió un error al procesar la solicitud' });
    }


}
//ITINERARIO POR ID de ITINERARIO
export const itinerario = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES

        // throw new Error('sample') //MANDAR ERRORES DE PRUEBA
        const id = req.params.id;
        console.log(id);

        console.log("select iti.id,titulo,nombre_foto,data,etiqueta,dias,personas,precio,name,autor_id from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE iti.id = " + id + ";");
        const [result] = await pool.query("select iti.id,titulo,nombre_foto,data,etiqueta,dias,personas,precio,name, autor_id from itinerarios AS iti INNER JOIN usuarios AS us ON iti.autor_id = us.id WHERE iti.id = ?;", [id])

        // console.log(result[0]);
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
        const [result] = await pool.query("select num_dia,titulo_dia,texto_dia from itinerarios AS iti INNER JOIN textositinerarios AS textos ON iti.id=textos.id_itinerario WHERE iti.id = ? ORDER BY num_dia LIMIT 1;", [id])

        res.send(result);


    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}

export const textosItinerarios_sin_limite = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES

        // throw new Error('sample') //MANDAR ERRORES DE PRUEBA
        const id = req.params.id;
        console.log(id);

        console.log("select num_dia,titulo_dia,texto_dia from itinerarios AS iti INNER JOIN textositinerarios AS textos ON iti.id=textos.id_itinerario WHERE iti.id = " + id + " ORDER BY num_dia;");
        const [result] = await pool.query("select num_dia,titulo_dia,texto_dia from itinerarios AS iti INNER JOIN textositinerarios AS textos ON iti.id=textos.id_itinerario WHERE iti.id = ? ORDER BY num_dia;", [id])

        res.send(result);


    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}

export const misItinerarios = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES

        console.log(req.body);
        let query = "";
        let params = [];
        const { autor_id, orden } = req.body;


        if (orden === "precio_asc") {
            query = "Select * from itinerarios  WHERE autor_id = ? order by precio ASC;"
            params = [autor_id];
        } else if (orden === "precio_desc") {
            query = "Select * from itinerarios  WHERE autor_id = ? order by precio DESC;"
            params = [autor_id];
        } else if (orden === "fecha_asc") {
            query = "Select * from itinerarios  WHERE autor_id = ? order by fecha ASC;"
            params = [autor_id];
        } else if (orden === "fecha_desc") {
            query = "Select * from itinerarios  WHERE autor_id = ? order by fecha DESC;"
            params = [autor_id];
        } else {
            query = "Select * from itinerarios  WHERE autor_id = ?;"
            params = [autor_id];
        }

        const [result] = await pool.query(query, params);

        res.send(result);

    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}


export const favoritos = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try {
        console.log(req.body);
        const { id_usuario, orden } = req.body;

        let query = "";
        let params = [];

        if (orden === "precio_asc") {
            query = "SELECT * FROM itinerarios AS iti INNER JOIN favoritos AS fav ON iti.id = fav.id_itinerario WHERE fav.id_usuario = ? ORDER BY precio ASC;";
            params = [id_usuario];
        } else if (orden === "precio_desc") {
            query = "SELECT * FROM itinerarios AS iti INNER JOIN favoritos AS fav ON iti.id = fav.id_itinerario WHERE fav.id_usuario = ? ORDER BY precio DESC;";
            params = [id_usuario];
        } else if (orden === "fecha_asc") {
            query = "SELECT * FROM itinerarios AS iti INNER JOIN favoritos AS fav ON iti.id = fav.id_itinerario WHERE fav.id_usuario = ? ORDER BY fecha ASC;";
            params = [id_usuario];
        } else if (orden === "fecha_desc") {
            query = "SELECT * FROM itinerarios AS iti INNER JOIN favoritos AS fav ON iti.id = fav.id_itinerario WHERE fav.id_usuario = ? ORDER BY fecha DESC;";
            params = [id_usuario];
        } else {
            query = "SELECT * FROM itinerarios AS iti INNER JOIN favoritos AS fav ON iti.id = fav.id_itinerario WHERE fav.id_usuario = ?;";
            params = [id_usuario];
        }

        const [result] = await pool.query(query, params);

        result.map(img => {
            fs.writeFileSync(path.join(__dirname, '../dbimagenes/' + img.nombre_foto), img.data)

        })

        res.send(result);

    } catch (error) {
        console.error('Error en la consulta:', error);
        // Manejo del error y devolución de respuesta apropiada
        res.status(500).json({ message: 'Ocurrió un error al procesar la solicitud' });
    }
}

export const addFav = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES
        console.log(req.body);
        const { id_itinerario, id_usuario } = req.body;
        //SI RECIBE PRECIO ASCENDENTE
        console.log("INSERT INTO favoritos (id_usuario, id_itinerario) VALUES ('" + id_usuario + "', '" + id_itinerario + "');");


        const [result] = await pool.query("INSERT INTO favoritos (id_usuario, id_itinerario) VALUES (?, ?);", [id_usuario, id_itinerario]);


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
        const [result] = await pool.query("delete from favoritos WHERE id_usuario = ? AND id_itinerario = ?;", [id_usuario, id_itinerario]);


        res.send(result);


    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}

export const subirItinerario = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try {

        const { destino, fecha, dias, personas, precio, autor_id, etiqueta, coordenadas } = req.body;


        if (!req.file) {
            return res.status(400).json({ message: "No se ha recibido ningún archivo de imagen" });
        }

        // Procesa y guarda el archivo de imagen en el servidor
        const tipo = req.file.mimetype;
        const nombre = req.file.originalname;
        const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename));


        const [result] = await pool.query("INSERT INTO itinerarios (titulo, fecha, dias, personas, precio, autor_id, etiqueta, nombre_foto, data,coordenadas) VALUES (?, ? ,? ,?, ?, ?, ?, ?, ?, ST_GeomFromText(?));", [destino, fecha, dias, personas, precio, autor_id, etiqueta, nombre, data, coordenadas]);


        res.send(result);



    } catch (error) {
        console.error('Error al subir el itinerario:', error);
        return res.status(500).json({ message: "Algo fue mal al subir el itinerario" });
    }
}


export const updateTextoItinerario = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try {

        const {texto_dia, titulo_dia, id_itinerario, num_dia } = req.body;

        const [result] = await pool.query("UPDATE textositinerarios set texto_dia = ? , titulo_dia = ? WHERE id_itinerario = ? and num_dia = ?;", [texto_dia, titulo_dia, id_itinerario,num_dia]);

        res.send(result);



    } catch (error) {
        console.error('Error al actualizar el texto:', error);
        return res.status(500).json({ message: "Algo fue mal al actualizar el texto" });
    }
}



export const subirTextoItinerario = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try {

        const { num_dia, titulo_dia, texto_dia, id_itinerario } = req.body;


        console.log("INSERT INTO textositinerarios (num_dia, texto_dia, id_itinerario, titulo_dia) VALUES ('" + num_dia + "', '" + texto_dia + "', '" + id_itinerario + "', '" + titulo_dia + "');");


        const [result] = await pool.query("INSERT INTO textositinerarios (num_dia, texto_dia, id_itinerario, titulo_dia) VALUES (?, ? ,? ,?);", [num_dia, texto_dia, id_itinerario, titulo_dia]);


        res.send(result);



    } catch (error) {
        console.error('Error al subir el texto:', error);
        return res.status(500).json({ message: "Algo fue mal al subir el texto" });
    }
}


export const borrarItinerario = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES

        console.log(req.body);
        let query = "";
        let params = [];
        const { id_itinerario } = req.body;

        query = "delete from itinerarios where id = ?;"
        params = [id_itinerario];


        const [result] = await pool.query(query, params);

        res.send(result);

    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}


export const comprobarIti_Usuario = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES

        console.log(req.body);
        let query = "";
        let params = [];
        const { id_itinerario, autor_id } = req.body;

        query = "select * from itinerarios WHERE id = ? AND autor_id = ?;"

        params = [id_itinerario, autor_id];


        const [result] = await pool.query(query, params);

        if (result.length > 0) {
            res.send(true);
        }
        else {
            res.send(false);

        }

    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}



