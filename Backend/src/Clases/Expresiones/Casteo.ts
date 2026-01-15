import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { TipoExpresion } from "../Utilidades/TipoExpresion";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { Error } from "../Utilidades/Error";
import { errores } from "../Utilidades/Salida";
import { TipoError } from "../Utilidades/TipoError";

export class Casteo extends Expresion{
    constructor(
        linea: number,
        columna: number,
        public tipo: Tipo,
        public expresion: Expresion
    ){
        super(linea, columna, TipoExpresion.CASTEO)
    }

    public ejecutar(entorno: Entorno): TipoRetorno{
        switch(this.tipo){
            case(Tipo.ENTERO):
                return this.toEntero(entorno)
            case(Tipo.DECIMAL):
                return this.toDecimal(entorno)
            case(Tipo.CADENA):
                return this.toCadena(entorno)
            case(Tipo.CARACTER):
                return this.toCaracter(entorno)
            default:
                errores.push(
                    new Error(
                        this.linea,
                        this.columna,
                        TipoError.SEMANTICO,
                        `No es posible realizar casteos con ${this.tipo}`
                    )
                )
                return {valor: 'NULL', tipo: Tipo.NULL}
        }
    }

    private toEntero(entorno: Entorno): TipoRetorno{
        let valor = this.expresion.ejecutar(entorno)
        if (valor.tipo == Tipo.DECIMAL || valor.tipo == Tipo.CADENA){
            return {valor: Math.floor(valor.valor), tipo: Tipo.ENTERO}
        }
        errores.push(
            new Error(
                this.linea,
                this.columna,
                TipoError.SEMANTICO,
                `No es posible castear ${Tipo[valor.tipo]} a ENTERO`
            )
        )
        return{valor: 'NULL', tipo: Tipo.NULL}
    }

    private toDecimal(entorno: Entorno): TipoRetorno{
        let valor = this.expresion.ejecutar(entorno)
        if (valor.tipo == Tipo.ENTERO || valor.tipo == Tipo.CARACTER){
            return {valor: Number(valor.valor), tipo: Tipo.DECIMAL}
        }
        errores.push(
            new Error(
                this.linea,
                this.columna,
                TipoError.SEMANTICO,
                `No es posible castear ${Tipo[valor.tipo]} a DECIMAL`
            )
        )
        return{valor: 'NULL', tipo: Tipo.NULL}
    }

    private toCadena(entorno: Entorno): TipoRetorno{
        let valor = this.expresion.ejecutar(entorno)
        if (valor.tipo == Tipo.ENTERO || valor.tipo == Tipo.DECIMAL){
            return {valor: String(valor.valor), tipo: Tipo.CADENA}
        }
        errores.push(
            new Error(
                this.linea,
                this.columna,
                TipoError.SEMANTICO,
                `No es posible castear ${Tipo[valor.tipo]} a CADENA`
            )
        )
        return{valor: 'NULL', tipo: Tipo.NULL}
    }

    private toCaracter(entorno: Entorno): TipoRetorno{
        let valor = this.expresion.ejecutar(entorno)
        if (valor.tipo == Tipo.ENTERO ){
            return {valor: String(valor.valor).charAt(0), tipo: Tipo.CARACTER}
        }
        errores.push(
            new Error(
                this.linea,
                this.columna,
                TipoError.SEMANTICO,
                `No es posible castear ${Tipo[valor.tipo]} a CADENA`
            )
        )
        return{valor: 'NULL', tipo: Tipo.NULL}
    }
}