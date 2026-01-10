import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { resta, suma, multiplicacion, division, potencia } from "../Utilidades/OperacionDominante";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { TipoExpresion } from "../Utilidades/TipoExpresion";

export class Aritmetico extends Expresion{
    private tipo: Tipo = Tipo.NULL

    constructor(
        linea: number,
        columna: number,
        public exp1: Expresion,
        public signo: string,
        public exp2: Expresion
    ){
        super(linea,
            columna,
            TipoExpresion.ARITMETICO)
    }

    public ejecutar(entorno: Entorno): TipoRetorno {
        switch(this.signo){
            case("+"):
                return this.sumar(entorno)
            case("-"):
                return this.resta(entorno)
            case("*"):
                return this.multiplicacion(entorno)
            case("/"):
                return this.division(entorno)
            case("^"):
                return this.potencia(entorno)
            default:
                throw new Error(`Operador ${this.signo} no soportado`);
        }
    }

    private sumar(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno)
        const valor2 = this.exp2.ejecutar(entorno)
        this.tipo = suma[valor1.tipo][valor2.tipo]
        if(this.tipo != Tipo.NULL){
            if(this.tipo === Tipo.ENTERO){
                console.log('SUMA -> Valor: ' + (valor1.valor + valor2.valor) + ' Tipo: ' + this.tipo)
                return {valor: Number(valor1.valor) + Number(valor2.valor),
                        tipo: this.tipo}
            } else if(this.tipo === Tipo.DECIMAL){
                console.log('SUMA -> Valor: ' + (valor1.valor + valor2.valor) + ' Tipo: ' + this.tipo)
                return {valor: parseFloat(valor1.valor) + parseFloat(valor2.valor),
                        tipo: this.tipo}
            } else if(this.tipo === Tipo.CADENA){
                console.log('SUMA -> Valor: ' + (valor1.valor + valor2.valor) + ' Tipo: ' + this.tipo)
                return {valor: valor1.valor.toString + valor1.valor.toString,
                        tipo: this.tipo}
            }
        }
        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    private resta(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno)
        const valor2 = this.exp2.ejecutar(entorno)
        this.tipo = resta[valor1.tipo][valor2.tipo]
        if(this.tipo != Tipo.NULL){
            if(this.tipo === Tipo.ENTERO){
                console.log('RESTA -> Valor: ' + (valor1.valor - valor2.valor) + ' Tipo: ' + this.tipo)
                return {valor: Number(valor1.valor) - Number(valor2.valor),
                        tipo: this.tipo}
            } else if(this.tipo === Tipo.DECIMAL){
                console.log('RESTA -> Valor: ' + (valor1.valor - valor2.valor) + ' Tipo: ' + this.tipo)
                return {valor: parseFloat(valor1.valor) - parseFloat(valor2.valor),
                        tipo: this.tipo}
            }
        }
        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    private multiplicacion(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno)
        const valor2 = this.exp2.ejecutar(entorno)
        this.tipo = multiplicacion[valor1.tipo][valor2.tipo]
        if(this.tipo != Tipo.NULL){
            if(this.tipo === Tipo.ENTERO){
                console.log('MULTIPLICACIÓN -> Valor: ' + (valor1.valor * valor2.valor) + ' Tipo: ' + this.tipo)
                return {valor: Number(valor1.valor) * Number(valor2.valor),
                        tipo: this.tipo}
            } else if(this.tipo === Tipo.DECIMAL){
                console.log('MULTIPLICACIÓN -> Valor: ' + (valor1.valor * valor2.valor) + ' Tipo: ' + this.tipo)
                return {valor: parseFloat(valor1.valor) * parseFloat(valor2.valor),
                        tipo: this.tipo}
            }
        }
        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    private division(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno)
        const valor2 = this.exp2.ejecutar(entorno)
        this.tipo = division[valor1.tipo][valor2.tipo]
        if(this.tipo != Tipo.NULL){
            if(this.tipo === Tipo.ENTERO || this.tipo == Tipo.DECIMAL){
                console.log('DIVISIÓN -> Valor: ' + (valor1.valor / valor2.valor) + ' Tipo: ' + this.tipo)
                return {valor: Number(valor1.valor) / Number(valor2.valor),
                        tipo: Tipo.DECIMAL}
                }
        }
        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    private potencia(entorno: Entorno): TipoRetorno {
        const valor1 = this.exp1.ejecutar(entorno)
        const valor2 = this.exp2.ejecutar(entorno)
        this.tipo = potencia[valor1.tipo][valor2.tipo]
        if(this.tipo != Tipo.NULL){
            if(this.tipo === Tipo.ENTERO){
                console.log('POTENCIA -> Valor: ' + (valor1.valor ** valor2.valor) + ' Tipo: ' + this.tipo)
                return {valor: Number(valor1.valor) ** Number(valor2.valor),
                        tipo: this.tipo}
            } else if(this.tipo === Tipo.DECIMAL){
                console.log('POTENCIA -> Valor: ' + (valor1.valor ** valor2.valor) + ' Tipo: ' + this.tipo)
                return {valor: parseFloat(valor1.valor) ** parseFloat(valor2.valor),
                        tipo: this.tipo}
            }
        }
        return {valor: 'NULL', tipo: Tipo.NULL}
    }
}