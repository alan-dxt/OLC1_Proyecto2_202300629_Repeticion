import { Expresion } from "../Abstractas/Expresion";
import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Error } from "../Utilidades/Error";
import { errores } from "../Utilidades/Salida";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { TipoError } from "../Utilidades/TipoError";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";

export class DeclaracionID extends Instruccion{
    constructor(
        linea: number,
        columna: number,
        private listaIds: string[],
        private tipo: Tipo,
        private listaValores: Expresion[] | null
    ){
        super(linea, columna, tipoInstruccion.DECLARACION_VARIABLE)
    }

    public ejecutar(entorno: Entorno): void {
        if (this.listaValores !== null) {
            if(this.listaIds.length !== this.listaValores.length){
                errores.push(
                    new Error(
                        this.linea,
                        this.columna,
                        TipoError.SEMANTICO,
                        `La cantidad de variables(${this.listaIds.length}) no coincide con la cantidad de valores(${this.listaValores}) [${this.linea}, ${this.columna}]`
                    )
                )
                return
            }
            //console.log(`Variables del tipo ${this.tipo} -- ${this.listaIds.length}`)
            for(let i: number = 0; i < this.listaIds.length; i++){
                let valor: TipoRetorno = this.listaValores[i].ejecutar(entorno)
                if(this.tipo === Tipo.DECIMAL && valor.tipo === Tipo.ENTERO){
                    valor.valor = parseFloat(valor.valor)
                    valor.tipo = Tipo.DECIMAL
                } 
                if (valor.tipo !== this.tipo) {
                    //El resultado de la expresion y el tipo asignado no coinciden
                    errores.push(
                        new Error(
                            this.linea,
                            this.columna,
                            TipoError.SEMANTICO,
                            `Los tipos de datos no coinciden, se esperaba ${Tipo[this.tipo]} y se obtuvo ${Tipo[valor.tipo]} [${this.linea}, ${this.columna}]`
                        )
                    )
                    return
                }
                //Declaracion con valor asignano
                //entero a con valor 1;
                //console.log(`Identificador: ${this.listaIds[i]} Valor: ${this.listaValores[i].ejecutar(entorno).valor} almacenados`)
                entorno.guardarVariable(
                    this.listaIds[i],
                    valor.valor,
                    this.tipo,
                    this.linea,
                    this.columna
                )
            }
        } else {
            //Asignacion sin valor asignado
            //entero a;
            for(let i: number = 0; i<this.listaIds.length; i++){
                //console.log(`Identificador: ${this.listaIds[i]}`)
                entorno.guardarVariable(
                    this.listaIds[i],
                    this.valorPredefinido(),
                    this.tipo,
                    this.linea,
                    this.columna
                )
            }
        }
    }

    private valorPredefinido(): any {
        switch (this.tipo) {
            case Tipo.ENTERO:
                return 0
            case Tipo.DECIMAL:
                return 0.0
            case Tipo.BOOLEANO:
                return true
            case Tipo.CADENA:
                return ""
            case Tipo.CARACTER:
                return '\0'
            default:
                return null
        }
    }

}