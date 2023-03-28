//Aqui iran las rutas que van a ir relacionadas a veterinarios

import express from "express";
import { 
    registrar,
    perfil,
    confirmar,
    autenticar,

} from "../controllers/veterinarioController.js";
import checkAuth from '../middleware/authMiddleware.js'


const router = express.Router();

//Area publica
router.post('/',registrar);
router.get('/confirmar/:token',confirmar); //Con los : express te permite crear un parametro dinamico
router.post('/login',autenticar);
  
//Area privada
router.get('/perfil',checkAuth,perfil); 


export default router; 