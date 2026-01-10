import express from 'express'
import { Controlador } from '../Controlador/Controlador'

const routerInterpreter = express.Router()
const interpreter: Controlador = new Controlador()

routerInterpreter.get('/', interpreter.running)
routerInterpreter.post('/parserFile', interpreter.parserFile)
routerInterpreter.get('/getSymbolsTable', interpreter.getSymbolstTable)

export default routerInterpreter