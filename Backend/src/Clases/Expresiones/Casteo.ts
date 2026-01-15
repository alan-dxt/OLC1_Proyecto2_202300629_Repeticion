import { Expresion } from "../Abstractas/Expresion";
import { Entorno } from "../Entorno/Entorno";
import { TipoExpresion } from "../Utilidades/TipoExpresion";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { Error } from "../Utilidades/Error";

export class Casteo extends Expresion{
    constructor(
        linea: number,
        columna: number,
        public tipo: Tipo,
        public expresion: Expresion
    ){
        super(linea, columna, TipoExpresion.CASTEO)
    }

    public ejecutar(entorno: Entorno): TipoRetorno{
        switch(this.tipo){
            default:
                //throw new Error(`Operador ${this.tipo} no soportado`);
        }
    }

}