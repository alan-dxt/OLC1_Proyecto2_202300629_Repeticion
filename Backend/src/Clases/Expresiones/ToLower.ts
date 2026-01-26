import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { TipoExpresion } from "../Utilidades/TipoExpresion";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { errores } from "../Utilidades/Salida";
import { Error } from "../Utilidades/Error";
import { TipoError } from "../Utilidades/TipoError";

export class ToLower extends Expresion{
    constructor(
        linea: number,
        columna: number,
        private expresion: Expresion
    ){
        super(linea, columna, TipoExpresion.TO_LOWER)
    }

    public ejecutar(entorno: Entorno): TipoRetorno {
        let expresion = this.expresion.ejecutar(entorno)
        if(expresion.tipo === Tipo.CADENA){
            return { valor: String(expresion.valor).toLowerCase(), tipo: Tipo.CADENA }
        }
        errores.push(
            new Error(
                this.linea,
                this.columna,
                TipoError.SEMANTICO,
                `Se esperaba una expresion del tipo CADENA pero se obtuvo ${Tipo[expresion.tipo]}`
            )
        )
        return {valor: 'NULL', tipo: Tipo.NULL}
    }
}