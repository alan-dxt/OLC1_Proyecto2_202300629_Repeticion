import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";

//Que se ejecuta y espacio de ejecucion
//Entorno <--> Bloque
//Sin bloque no existe la ejecucion
export class Bloque extends Instruccion{
    constructor(
        linea: number,
        columna: number,
        private instrucciones: Instruccion[]
    ){
        super(linea, columna, tipoInstruccion.BLOQUE)
    }

    public ejecutar(entorno: Entorno): any {
        const nuevoEntorno = new Entorno(entorno, entorno.nombre)

        for (const instruccion of this.instrucciones) {
            const resultado = instruccion.ejecutar(nuevoEntorno)

            // Si una instrucción devuelve algo, se propaga
            if (resultado !== null && resultado !== undefined) {
                return resultado
            }
        }

        return null
    }
}