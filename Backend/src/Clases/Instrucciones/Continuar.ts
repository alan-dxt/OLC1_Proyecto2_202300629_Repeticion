import { Instruccion } from "../Abstractas/Instruccion";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";
import { Entorno } from "../Entorno/Entorno";

export class Continuar extends Instruccion{
    constructor(
        linea: number,
        columna: number,
    ){
        super(linea, columna, tipoInstruccion.CONTINUAR)
    }

    public ejecutar(entorno: Entorno) {
        
    }
}