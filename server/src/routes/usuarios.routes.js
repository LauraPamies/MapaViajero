import { Router } from "express";

import {loginUsuario, registroUsuario} from "../controllers/usuarios.controller.js"

const router = Router()

//DEFINIMOS LOS ENDPOINTS
router.post("/login" , loginUsuario);

router.post("/registro", registroUsuario);
  
export default router