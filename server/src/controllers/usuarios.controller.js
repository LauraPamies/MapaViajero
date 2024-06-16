import { pool } from "../db.js";
import bcrypt from 'bcryptjs';



export const loginUsuario = async (req, res) => { //req = request, osea los valores que manda el usuario.   res = respuesta, osea la respuesta del servidor
    try { //MANEJO DE ERRORES

        // throw new Error('sample') //MANDAR ERRORES DE PRUEBA
        const { email, password } = req.body;

        //OTRA MANERA DE COGER LOS VALORES
        // const email = req.body.email;
        // const password = req.body.password;

        const [busqueda] = await pool.query("Select password from usuarios where email = ?", [email]);

        let autenticado = await bcrypt.compare(password, busqueda[0].password);

        if (autenticado) {
            console.log("Select * from usuarios where email = '" + email + "';");

            const [result] = await pool.query("Select * from usuarios where email = ? ", [email])

            res.send(result[0])
        }
        else {
            throw new Error('sample') //MANDAR ERRORES DE PRUEBA

        }

        // res.send(result);
    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }

}

export const registroUsuario = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let passHash = await bcrypt.hash(password, 5);

        console.log("INSERT INTO usuarios (name, email, password) VALUES ('" + name + "', '" + email + "', '" + passHash + "');");


        const [rows] = await pool.query("INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)", [name, email, passHash])

        //ESO ES LO QUE RECIBE COMO RESPUESTA EL USUARIO QUE HACE LA PETICION, P.E POSTMAN
        res.send({ //Entre llaves para devolver en JSON
            id: rows.insertId, //Es el nombre de la propiedad que devuelve el id en rows (la respuesta a la consulta)
            name,
            passHash
        })
    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }
}

