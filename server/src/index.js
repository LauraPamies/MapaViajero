import express from 'express'
import cors from "cors"


//IMPORTAMOS LAS RUTAS
import usuarios_routes from "./routes/usuarios.routes.js"

const app = express();
app.use(express.json()); //PARA PODER INTERPRETAR LOS DATOS JSON
app.use(cors()); //ESTO ES IMPORTANTE PARA QUE DESDE EL CLIENTE SE PUEDA PEDIR SOLICITUD SIN PROBLEMAS


//USAMOS LAS RUTAS IMPORTADAS
app.use(usuarios_routes)
// app.use("Nombre de archivo rutas")


//UNA RUTA PARA CUANDO PONEMOS UN ENDPOINT QUE NO EXISTE
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint Not found'
    })
})

// app.post("/registro",(req,res)=>{
    
//     const sql = "INSERT INTO usuarios (name,email,password) VALUES(?)";
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.password
//     ]
    

//     db.query(sql,[values],(err,data)=>{
//         if(err){
//             return res.json("Error");
//         }
//         return res.json(data);
//     })
// });


// app.post("/login",(req,res)=>{
    
//     const sql = "SELECT * FROM USUARIOS WHERE email = ? AND PASSWORD = ?";
 

//     db.query(sql,[req.body.email,req.body.password],(err,data)=>{
//         if(err){
//             return res.json("Error");
//         }
//         if(data.length > 0){
//             return res.json("Success");
//         }else{
//             return res.json("Fail");
//         }
//     })
// });

// function pruebas()
// {


// app.post("/create",(req,res)=>{
//     const nombre = req.body.nombre;
//     const edad = req.body.edad;
//     const pais = req.body.pais;
//     const cargo = req.body.cargo;
//     const anios = req.body.anios;

//     db.query("INSERT INTO empleados (NOMBRE,EDAD,PAIS,CARGO,ANIOS) VALUES(?,?,?,?,?)",[nombre,edad,pais,cargo,anios],
//     (err,result)=>{
//         if(err){
//             console.log(err);
//         }else{
//             res.send(result);
//         }
//     }
// )
// });


// app.get("/empleados",(req,res)=>{
//     db.query("SELECT * FROM empleados",
//     (err,result)=>{
//         if(err){
//             console.log(err);
//         }else{
//             res.send(result);
//         }
//     }
// )
// });


// app.put("/update",(req,res)=>{
//     const id = req.body.id;
//     const nombre = req.body.nombre;
//     const edad = req.body.edad;
//     const pais = req.body.pais;
//     const cargo = req.body.cargo;
//     const anios = req.body.anios;

//     db.query("UPDATE empleados SET NOMBRE =?,EDAD=?,PAIS=?,CARGO=?,ANIOS=? WHERE id=?",[nombre,edad,pais,cargo,anios,id],
//     (err,result)=>{
//         if(err){
//             console.log(err);
//         }else{
//             res.send(result);
//         }
//     }
// )
// });


// app.delete("/delete/:id",(req,res)=>{ //Envio el id via URL, no en el cuerpo
//     const id = req.params.id;
//     db.query("DELETE FROM empleados WHERE id=?",id,
//     (err,result)=>{
//         if(err){
//             console.log(err);
//         }else{
//             res.send(result);
//         }
//     }
// )
// });



// }

app.listen(3050,()=>{
    console.log("Corriendo SERVIDOR en el puerto 3050");
})

