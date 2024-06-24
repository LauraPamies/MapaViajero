import { Router } from "express";
import { preddicion } from "../controllers/prediccion.controller.js";

const router = Router();

// Definimos los endpoints
router.post("/predecir", preddicion);

export default router;