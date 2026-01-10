import { Request, Response } from "express";
import { Entorno } from "../Clases/Entorno/Entorno";
import { getErrores, getSalida, limparSalidas } from "../Clases/Utilidades/Salida";
import { tablaSimbolos } from "../Clases/Entorno/Tabla";

export class Controlador {

    public running(req: Request, res: Response) {
        res.send('Interpreter is running')
    }

    public parserFile(req: Request, res: Response){
        //console.log(req.body)
        let file = req.body.file
        let parser = require('../Lenguaje/Parser')
        var fs = require('fs')
        console.log('\x1Bc');
        console.log(file)
        fs.readFile(file, 'utf-8', (err: Error, data: string) => {
            if(err){
                console.log(err)
                res.json({
                    console: err
                })
            } else {
                limparSalidas()
                tablaSimbolos.limpiarTabla()
                let instrucciones = parser.parse(data)
                const global: Entorno = new Entorno(null, 'Global')
                for(let instruccion of instrucciones){
                    try {
                        instruccion.ejecutar(global)
                    }
                    catch(error){}
                }
                var out: string = getSalida()
                console.log()
                console.log()
                console.log('\x1b[32mXNK SimpleCode\x1b[0m')
                console.log(out)
                res.json({
                    console: out
                })
            }
        })

    }

    public getSymbolstTable(req: Request, res: Response) {
        try {
            res.json({
                table: tablaSimbolos.simbolos
            })
        } catch(error){
            res.json({
                table: error
            })
        }
    }

    public getErrores(req: Request, res: Response) {
        try {
            res.json({
                table: getErrores()
            })
        }
        catch(error){
            res.json({
                errors: error
            })
        }
    }
}