import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Error } from "../Utilidades/Error";
import { errores } from "../Utilidades/Salida";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { TipoError } from "../Utilidades/TipoError";
import { TipoExpresion } from "../Utilidades/TipoExpresion";

export class OperadorTernario extends Expresion{
    constructor(
        linea: number,
        columna: number,
        private condicion: Expresion,
        private valor1: Expresion,
        private valor2: Expresion
    ){
        super(
            linea, columna, TipoExpresion.OPERADOR_TERNARIO
        )
    }

    public ejecutar(entorno: Entorno): TipoRetorno {
        const condicion = this.condicion.ejecutar(entorno)
        if(condicion.tipo ===Tipo.BOOLEANO){
            if(condicion.valor === true){
                const respuesta = this.valor1.ejecutar(entorno)
                return respuesta
            } else {
                const respuesta = this.valor2.ejecutar(entorno)
                return respuesta
            }
        }
        errores.push(
            new Error(
                this.linea,
                this.columna,
                TipoError.SEMANTICO,
                `Se espera que la condicion sea de tipo BOOLEANO cuando se obtuvo ${Tipo[condicion.tipo]}`
            )
        )
        return {valor: 'NULL', tipo: Tipo.NULL}
    }
}