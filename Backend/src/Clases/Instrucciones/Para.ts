import { Expresion } from "../Abstractas/Expresion";
import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Bloque } from "./Bloque";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";
import { errores } from "../Utilidades/Salida";
import { Error } from "../Utilidades/Error";
import { TipoError } from "../Utilidades/TipoError";
import { Tipo } from "../Utilidades/Tipo";

export class Para extends Instruccion{
    
    constructor(
        linea: number,
        columna: number,
        public inicio: Instruccion,
        public condicion: Expresion,
        public actualizacion: Instruccion,
        public instrucciones: Instruccion[]
    ){
        super(linea, columna, tipoInstruccion.PARA)
    }

    public ejecutar(entorno: Entorno) {
        //Creacion del bloque de instrucciones
        const bloqueInstrucciones = new Bloque(this.linea, this.columna, this.instrucciones)
        //Entorno Local de ejecucion para el ciclo for
        const entornoPara = new Entorno(entorno, entorno.nombre + "_PARA");
        //Ejecucion de las de la declaracion
        this.inicio.ejecutar(entornoPara)
        //Ejecicion de la condicion para la verificacion
        let condicion = this.condicion.ejecutar(entornoPara)
        while (condicion.valor === true) {
            bloqueInstrucciones.ejecutar(entornoPara)
            this.actualizacion.ejecutar(entornoPara)
            condicion = this.condicion.ejecutar(entornoPara)
        }
    }
}