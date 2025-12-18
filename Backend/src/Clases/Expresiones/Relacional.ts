import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { TipoExpresion } from "../Utilidades/TipoExpresion";

export class Relacional extends Expresion{
    private tipo: Tipo = Tipo.BOOLEANO

    constructor(
        linea: number,
        columna: number,
        public exp1: Expresion,
        public signo: string,
        public exp2: Expresion,
    ){
        super(linea, columna, TipoExpresion.RELACIONAL)
    }

    public ejecutar(entorno: Entorno): TipoRetorno {
        switch(this.signo){
            case(">="):
                return this.mayorIgual(entorno)
            case(">"):
                return this.mayor(entorno)
            case("<="):
                return this.menorIgual(entorno)
            case("<"):
                return this.menor(entorno)
            case("=="):
                return this.igualdad(entorno)
            case("!="):
                return this.diferente(entorno)
            default:
                throw new Error(`Operador ${this.signo} no soportado`);
        }
    }

    private igualdad(entorno: Entorno){
        const valor1 = this.exp1.ejecutar(entorno)
        const valor2 = this.exp2.ejecutar(entorno)
        this.tipo = Tipo.BOOLEANO

        if(valor1.tipo === Tipo.ENTERO || valor1.tipo ===Tipo.DOUBLE || valor1.tipo === Tipo.CARACTER){
            if(valor2.tipo === Tipo.ENTERO || valor2.tipo ===Tipo.DOUBLE || valor2.tipo === Tipo.CARACTER){
                //12 == '12' -> true
                // 12 === '12' -> false
                return {valor: valor1.valor === valor2.valor, tipo: this.tipo}
            }
        }
        if(valor1.tipo === Tipo.CADENA && valor2.tipo === Tipo.CADENA){
            return {valor: valor1.valor === valor2.valor, tipo: this.tipo}
        }
        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    private mayor(entorno: Entorno){
        const valor1 = this.exp1.ejecutar(entorno)
        const valor2 = this.exp2.ejecutar(entorno)

        if(valor1.tipo === Tipo.ENTERO || valor1.tipo === Tipo.DOUBLE){
            if(valor2.tipo === Tipo.ENTERO || valor2.tipo === Tipo.DOUBLE){
                return {valor: valor1.valor > valor2.valor, tipo: this.tipo}
            }
        }

        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    private mayorIgual(entorno: Entorno){
        const valor1 = this.exp1.ejecutar(entorno)
        const valor2 = this.exp2.ejecutar(entorno)

        if(valor1.tipo === Tipo.ENTERO || valor1.tipo === Tipo.DOUBLE){
            if(valor2.tipo === Tipo.ENTERO || valor2.tipo === Tipo.DOUBLE){
                return {valor: valor1.valor >= valor2.valor, tipo: this.tipo}
            }
        }

        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    private menor(entorno: Entorno){
        const valor1 = this.exp1.ejecutar(entorno)
        const valor2 = this.exp2.ejecutar(entorno)

        if(valor1.tipo === Tipo.ENTERO || valor1.tipo === Tipo.DOUBLE){
            if(valor2.tipo === Tipo.ENTERO || valor2.tipo === Tipo.DOUBLE){
                return {valor: valor1.valor < valor2.valor, tipo: this.tipo}
            }
        }

        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    private menorIgual(entorno: Entorno){
        const valor1 = this.exp1.ejecutar(entorno)
        const valor2 = this.exp2.ejecutar(entorno)

        if(valor1.tipo === Tipo.ENTERO || valor1.tipo === Tipo.DOUBLE){
            if(valor2.tipo === Tipo.ENTERO || valor2.tipo === Tipo.DOUBLE){
                return {valor: valor1.valor <= valor2.valor, tipo: this.tipo}
            }
        }

        return {valor: 'NULL', tipo: Tipo.NULL}
    }

    private diferente(entorno: Entorno){
        const valor1 = this.exp1.ejecutar(entorno)
        const valor2 = this.exp2.ejecutar(entorno)
        this.tipo = Tipo.BOOLEANO

        if(valor1.tipo === Tipo.ENTERO || valor1.tipo ===Tipo.DOUBLE || valor1.tipo === Tipo.CARACTER){
            if(valor2.tipo === Tipo.ENTERO || valor2.tipo ===Tipo.DOUBLE || valor2.tipo === Tipo.CARACTER){
                //12 == '12' -> true
                // 12 === '12' -> false
                return {valor: valor1.valor != valor2.valor, tipo: this.tipo}
            }
        }
        if(valor1.tipo === Tipo.CADENA && valor2.tipo === Tipo.CADENA){
            return {valor: valor1.valor != valor2.valor, tipo: this.tipo}
        }
        return {valor: 'NULL', tipo: Tipo.NULL}
    }
}