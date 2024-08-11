import { pool } from "../db.js";
import bcrypt from 'bcryptjs';

export const loginUsuario = async (req, res) => { 
        try {

        const { email, password } = req.body;

        const [busqueda] = await pool.query("Select password from usuarios where email = ?", [email]);

        let autenticado = await bcrypt.compare(password, busqueda[0].password);

        if (autenticado) {
            console.log("Select * from usuarios where email = '" + email + "';");

            const [result] = await pool.query("Select * from usuarios where email = ? ", [email])

            res.send(result[0])
        }

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

        res.send({
            id: rows.insertId,
            name,
            passHash
        })
    } catch (error) {
        return res.status(500).json({
            message: "Algo fue mal"
        })
    }
}

