import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";
import { Parametro } from "../Auxiliares/Parametro";


export class Procedimiento extends Instruccion{
    constructor(
        linea: number,
        columna: number,
        public nombreParametro: string,
        public parametros: Parametro[],
        public instrucciones: Instruccion[]
    ){
        super(linea, columna, tipoInstruccion.PROCEDIMIENTO)
    }

    public ejecutar(entorno: Entorno) {
        entorno.guardarProcedimiento(this.nombreParametro, this)
    }
}