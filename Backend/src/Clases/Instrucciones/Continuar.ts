import { Instruccion } from "../Abstractas/Instruccion";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";
import { Entorno } from "../Entorno/Entorno";

export class Continue {
    public readonly tipo = "CONTINUE"
}

export class Continuar extends Instruccion {
    constructor(linea: number, columna: number) {
        super(linea, columna, tipoInstruccion.CONTINUAR);
    }

    public ejecutar(entorno: Entorno) {
        throw new Continue();
    }
}
