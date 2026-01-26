import { Expresion } from "../Abstractas/Expresion";
import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Bloque } from "./Bloque";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";
import { errores } from "../Utilidades/Salida";
import { Error } from "../Utilidades/Error";
import { TipoError } from "../Utilidades/TipoError";
import { Tipo } from "../Utilidades/Tipo";

export class Hacer extends Instruccion{
    private bloqueHacer: Bloque
    constructor(
        linea: number,
        columna: number,
        private instrucciones: Instruccion[],
        private condicion: Expresion
    ){
        super(linea, columna, tipoInstruccion.HACER)
        //Inicializacion del bloque local
        this.bloqueHacer = new Bloque(linea, columna, instrucciones)
    }

    public ejecutar(entorno: Entorno) {
        //Creacion del entorno local de ejecucion
        const entornoHacer = new Entorno(entorno, entorno.nombre + "_HACER")
        //Primera ejecucion del bloque
        this.bloqueHacer.ejecutar(entornoHacer)
        //Validacion de la condicion
        let condicion  = this.condicion.ejecutar(entornoHacer)
        //verificacion de la condicion
        if(condicion.tipo !== Tipo.BOOLEANO){
            errores.push(
                new Error(
                    this.linea,
                    this.columna,
                    TipoError.SEMANTICO,
                    `Se espera una condicion del tipo BOOLEANO pero se obtuvo ${Tipo[condicion.tipo]}`
                )
            )
            return
        }
        //Ciclo
        while(condicion.valor === false){
            this.bloqueHacer.ejecutar(entornoHacer)
            condicion = this.condicion.ejecutar(entornoHacer)
        }

    }
}