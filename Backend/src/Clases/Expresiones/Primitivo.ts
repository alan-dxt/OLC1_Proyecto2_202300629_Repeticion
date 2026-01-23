import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { TipoExpresion } from "../Utilidades/TipoExpresion";

export class Primitivo extends Expresion{
    constructor(
        linea: number,
        columna: number,
        public valor: any,
        public tipo: Tipo
    ){
        super(linea, columna, TipoExpresion.PRIMITIVO)
    }

    public ejecutar(_: Entorno): TipoRetorno {
        switch(this.tipo){
            case(Tipo.ENTERO):
                //console.log("->Entero Reconocido, valor: " + this.valor + "  tipo: " + this.tipo)
                return {valor: parseInt(this.valor), tipo: this.tipo}
            case(Tipo.DECIMAL):
                //console.log("->Decimal Reconocido, valor: " + this.valor + "  tipo: " + this.tipo)
                return {valor: parseFloat(this.valor), tipo: this.tipo}
            case(Tipo.CARACTER):
                this.valor = this.valor.substring(1, this.valor.length - 1)
                //console.log("->Caracter Reconocido, valor: " + this.valor + "  tipo: " + this.tipo)
                return {valor: this.valor, tipo: this.tipo}
            case(Tipo.BOOLEANO):
                //console.log("->Booleano Reconocido, valor: " + this.valor + "  tipo: " + this.tipo)
                return {valor: this.valor, tipo: this.tipo}
            case Tipo.CADENA: 
                let valor = this.valor.substring(1, this.valor.length - 1)
                valor = valor.replace(/\\n/g, '\n')
                valor = valor.replace(/\\t/g, '\t')
                valor = valor.replace(/\\"/g, '\"')
                valor = valor.replace(/\\'/g, '\'')
                valor = valor.replace(/\\\\/g, '\\')
                //console.log("->Cadena Reconocida, valor: " + this.valor + "  tipo: " + this.tipo)
                return { valor: valor, tipo: this.tipo }
            default:
                throw new Error(`Primitivo ${this.valor} no soportado`)
        }
    }
}