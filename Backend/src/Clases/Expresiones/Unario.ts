import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { TipoExpresion } from "../Utilidades/TipoExpresion";

export class Unario extends Expresion{
    constructor(
        linea: number,
        columna: number,
        public signo: string,
        public exp: Expresion
    ){
        super(
            linea,
            columna,
            TipoExpresion.UNARIO
        )
    }

    public ejecutar(entorno: Entorno): TipoRetorno {
        switch(this.signo){
            case("!"):
                return this.negacionLogica(entorno)
            case("-"):
                return this.negacion(entorno)
            default:
                throw new Error(`Operador ${this.signo} no soportado`)
        }
    }

    private negacionLogica(entorno: Entorno): TipoRetorno{
        const valor = this.exp.ejecutar(entorno)
        if(valor.tipo === Tipo.BOOLEANO){
            return {valor: !valor.valor, tipo: Tipo.BOOLEANO}
        }
        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    private negacion(entorno: Entorno): TipoRetorno {
        const valor = this.exp.ejecutar(entorno)
        if(valor.tipo === Tipo.ENTERO){
            return {valor: -valor.valor, tipo: Tipo.ENTERO}
        } else if(valor.tipo === Tipo.DECIMAL){
            return {valor: -valor.valor, tipo: Tipo.DECIMAL}
        }
        return {valor: 'NULL', tipo: Tipo.NULL}
    }
}

    