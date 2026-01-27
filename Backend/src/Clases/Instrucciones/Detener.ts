import { Instruccion } from "../Abstractas/Instruccion";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";
import { Entorno } from "../Entorno/Entorno";

export class Return {
    public readonly tipo = "RETURN"
}

export class Detener extends Instruccion{
    constructor(linea: number, columna: number){
        super(linea, columna, tipoInstruccion.DETENER)
    }

    public ejecutar(entorno: Entorno) {
        throw new Return
    }
}