import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Tipo } from "../Utilidades/Tipo";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";
import { Parametro } from "../Auxiliares/Parametro";

export class Funcion extends Instruccion{
    constructor(
        linea: number,
        columna: number,
        public nombreFuncion: string,
        public parametros: Parametro[],     //Parametros de entrada
        public tipo: Tipo,                  //Tipo de retorno de la funcion
        public instrucciones: Instruccion[]
    ){
        super(linea, columna, tipoInstruccion.FUNCION)
    }

    public ejecutar(entorno: Entorno) {
        entorno.guardarFuncion(this.nombreFuncion, this)
    }
}