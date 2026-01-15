import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Bloque } from "./Bloque";
import { TipoRetorno } from "../Utilidades/Tipo";
import { TipoExpresion } from "../Utilidades/TipoExpresion";
import { Tipo } from "../Utilidades/Tipo";
import { TipoError } from "../Utilidades/TipoError";
/* 
export class LLamadafuncion extends Expresion{
    constructor(
        linea: number,
        columna: number,
        public idFuncion: string,
        public argumentos: Expresion[]
    ){
        super(linea, columna, TipoExpresion.LLAMADA_FUNCION)
    }

    public ejecutar(entorno: Entorno): TipoRetorno {
        const funcion = entorno.getFuncion(this.idFuncion)
        //La funcion no existe
        if(!funcion){
            return{valor: null, tipo: Tipo.NULL}
        }
        //Validacion de la cantidad de parametros
        if(funcion.parametros.length !== this.argumentos.length){
            return{valor: null, tipo: Tipo.NULL}
        }
        //Entorno local de la funcion
        const entornoFuncion = new Entorno(entorno, this.idFuncion + "_entorno")

        //Declaracion y asignacion de los parámetross
        for(let i: number = 0; i<funcion.parametros.length; i++){
            const param = funcion.parametros[i] //Parámetro en Funcion
            const arg = this.argumentos[i]      //Parámetro en la llamada

            if(param.tipo !== arg.tipoExpresion})
        }
    }
}
    */