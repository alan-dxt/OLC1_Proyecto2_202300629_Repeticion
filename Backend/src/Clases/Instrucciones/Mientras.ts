import { Expresion } from "../Abstractas/Expresion";
import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Bloque } from "./Bloque";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";
import { errores } from "../Utilidades/Salida";
import { Error } from "../Utilidades/Error";
import { TipoError } from "../Utilidades/TipoError";
import { Tipo } from "../Utilidades/Tipo";

export class Mientras extends Instruccion{
    private bloqueMientras: Bloque //Bloque local de instrucciones
    constructor(
        linea: number,
        columna: number,
        private condicion: Expresion,
        private instrucciones: Instruccion[]
    ){
        super(linea, columna, tipoInstruccion.MIENTRAS)
        //Inicializacion del bloque de instrucciones
        this.bloqueMientras = new Bloque(this.linea, this.columna, this.instrucciones)
    }

    public ejecutar(entorno: Entorno){
        //Creacion del entorno local de ejecucion
        const entornoMientras = new Entorno(entorno, entorno.nombre + "_mientras")
        //ejecucion de la condicion
        let condicion = this.condicion.ejecutar(entornoMientras)
        //verificacion del tipo de la condicion
        if(condicion.tipo !== Tipo.BOOLEANO){
            errores.push(
                new Error(
                    this.linea,
                    this.columna,
                    TipoError.SINTACTICO,
                    `Se espera una condicion del tipo BOOLEANO pero se obtuvo ${condicion.tipo}`
                )
            )
            return
        }
        while(condicion.valor === true){
            this.bloqueMientras.ejecutar(entornoMientras)
            //Reevaluacion de la condicion
            condicion = this.condicion.ejecutar(entornoMientras)
        }

    }
}