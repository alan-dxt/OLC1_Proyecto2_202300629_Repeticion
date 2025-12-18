import express from 'express'
import { Controlador } from '../Controlador/Controlador'

const router = express.Router()
const interpreter: Controlador = new Controlador()

router.get('/', interpreter.running)
router.post('parserFile', interpreter.parserFile)
router.get('/getSymbolsTable', interpreter.getSymbolstTable)

export default router