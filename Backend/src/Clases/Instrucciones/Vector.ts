import { Expresion } from "../Abstractas/Expresion";
import { Instruccion } from "../Abstractas/Instruccion";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { Entorno } from "../Entorno/Entorno";
import { Error } from "../Utilidades/Error";
import { errores } from "../Utilidades/Salida";
import { TipoError } from "../Utilidades/TipoError";
import { Celda } from "../Auxiliares/Celda";
import { VectorValor } from "../Auxiliares/VectorValor";

export class Vector extends Instruccion{
    private valores: TipoRetorno[] []= []
    constructor(
        linea: number,
        columna: number,
        private tipo: Tipo,
        private nombre: string,
        private celdas: Celda[] | null,
        private x: Expresion | null,
        private y: Expresion | null

    ){
        super(linea,columna, tipoInstruccion.VECTOR)
    }

    public ejecutar(entorno: Entorno) {
        
        if(this.celdas !== null){
            // Inicialización directa: [ [1,2] , [3,4] , [5,6] ]
            let dimensionY: number = this.celdas[0].getY()
            for(let X: number = 0; X < this.celdas.length; X++){
                let celdaActual: Celda = this.celdas[X]

                if(celdaActual.getY() !== dimensionY){
                    //una de las celdas no tiene el mismo valor numero de datos que el resto
                    // [ [ 1 , 2 ] , [ 3 ] , [ 5 ]]
                    errores.push(
                        new Error(
                            this.linea,
                            this.columna,
                            TipoError.SEMANTICO,
                            `La matriz no es rectangular, se esperaban ${dimensionY} columnas y se obtuvieron ${celdaActual.getY()}`
                        )
                    )
                    return
                }
                
                let fila: TipoRetorno[] = []
                
                for(let Y: number = 0; Y < this.celdas[X].getY(); Y++){
                    let valorActual: TipoRetorno = celdaActual.valores[Y].ejecutar(entorno)
                    
                    if(valorActual.tipo !== this.tipo){
                        //uno de los valores ingresados no coincide con el tipo ingresado
                        //entero[] vector1 = vector entero["a"];
                        errores.push(
                            new Error(
                                this.linea,
                                this.columna,
                                TipoError.SEMANTICO,
                                `Se esperaban valores de tipo ${Tipo[this.tipo]} pero se obtuvo ${Tipo[valorActual.tipo]}`
                            )
                        )
                        return
                    }
                    //console.log(valorActual.valor + " + " + Tipo[valorActual.tipo])
                    fila.push(valorActual)
                }
                //console.log("----------------------------")
                this.valores.push(fila)
            }
            console.log(`El vector tiene dimensiones de ${this.valores.length} x ${dimensionY}`)
            let nuevoVector = new VectorValor(this.linea, this.columna, this.tipo, this.nombre, this.valores, this.valores.length, dimensionY)
            entorno.guardarVector(this.nombre, nuevoVector)
        }
    }
}