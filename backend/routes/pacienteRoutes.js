import express from "express";
import {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente} from '../controllers/pacienteController.js'
import checkAuth from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .post(checkAuth, agregarPaciente)
    .get(checkAuth, obtenerPacientes)

router.route("/:id")
    .get(checkAuth, obtenerPaciente) //Obtenermos paciente
    .put(checkAuth, actualizarPaciente) //Actualizamos paciente
    .delete(checkAuth, eliminarPaciente) //Eliminamos paciente

export default router;