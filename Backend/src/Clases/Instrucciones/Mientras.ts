import { Expresion } from "../Abstractas/Expresion";
import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Bloque } from "./Bloque";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";
import { errores } from "../Utilidades/Salida";
import { Error } from "../Utilidades/Error";
import { TipoError } from "../Utilidades/TipoError";
import { Tipo } from "../Utilidades/Tipo";
import { Continue } from "./Continuar";
import { Return } from "./Detener";

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
        const entornoMientras = new Entorno(entorno, entorno.nombre + "_MIENTRAS")
        //ejecucion de la condicion
        let condicion = this.condicion.ejecutar(entornoMientras)
        //verificacion del tipo de la condicion
        if(condicion.tipo !== Tipo.BOOLEANO){
            errores.push(
                new Error(
                    this.linea,
                    this.columna,
                    TipoError.SINTACTICO,
                    `Se espera una condicion del tipo BOOLEANO pero se obtuvo ${Tipo[condicion.tipo]}`
                )
            )
            return
        }

        while (condicion.valor === true) {
            try {
                //Ejecucion de las instrucciones en el entorno local
                this.bloqueMientras.ejecutar(entornoMientras)
                //Reevaluacion de la condicion
                condicion = this.condicion.ejecutar(entornoMientras)
            } catch (e) {
                if (e instanceof Continue) {
                    condicion = this.condicion.ejecutar(entornoMientras);
                    continue
                }
                if(e instanceof Return){
                    condicion.valor = false
                }
                throw e;
            }
        }
    }
}