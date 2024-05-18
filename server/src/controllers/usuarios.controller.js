import { pool } from "../db.js";



export const loginUsuario = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES

        // throw new Error('sample') //MANDAR ERRORES DE PRUEBA
        const { email, password } = req.body;

        //OTRA MANERA DE COGER LOS VALORES
        // const email = req.body.email;
        // const password = req.body.password;

        console.log("Select * from usuarios where email = '" + email + "' AND password = '" + password + "';");

        const [result] = await pool.query("Select * from usuarios where email = ? AND password = ?", [email, password])

        res.send(result);
    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}

export const registroUsuario = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("INSERT INTO usuarios (name, email, password) VALUES ('" + name + "', '" + email + "', '" + password + "');");


        const [rows] = await pool.query("INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)", [name, email, password])

        //ESO ES LO QUE RECIBE COMO RESPUESTA EL USUARIO QUE HACE LA PETICION, P.E POSTMAN
        res.send({ //Entre llaves para devolver en JSON
            id: rows.insertId, //Es el nombre de la propiedad que devuelve el id en rows (la respuesta a la consulta)
            name,
            password
        })
    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }
}

