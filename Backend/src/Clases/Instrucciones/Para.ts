import { Expresion } from "../Abstractas/Expresion";
import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Bloque } from "./Bloque";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";
import { errores } from "../Utilidades/Salida";
import { Error } from "../Utilidades/Error";
import { TipoError } from "../Utilidades/TipoError";
import { Tipo } from "../Utilidades/Tipo";
import { Continue } from "./Continuar";

export class Para extends Instruccion{
    private bloquePara: Bloque
    constructor(
        linea: number,
        columna: number,
        public inicio: Instruccion,
        public condicion: Expresion,
        public actualizacion: Instruccion,
        public instrucciones: Instruccion[]
    ){
        super(linea, columna, tipoInstruccion.PARA)
        this.bloquePara = new Bloque(this.linea, this.columna, this.instrucciones)
    }

    public ejecutar(entorno: Entorno) {
        //Entorno Local de ejecucion para el ciclo for
        const entornoPara = new Entorno(entorno, entorno.nombre + "_PARA");
        //Ejecucion de las de la declaracion
        this.inicio.ejecutar(entornoPara)
        //Ejecicion de la condicion para la verificacion
        let condicion = this.condicion.ejecutar(entornoPara)
        if(condicion.tipo !== Tipo.BOOLEANO){
            errores.push(
                new Error(
                    this.linea,
                    this.columna,
                    TipoError.SINTACTICO,
                    `Se esperaba una condicion de tipo BOOLEANO pero se obtuvo ${Tipo[condicion.tipo]}`
                )
            )
            return
        }
        while (condicion.valor === true) {
            try {
                this.bloquePara.ejecutar(entornoPara)
                this.actualizacion.ejecutar(entornoPara)
                condicion = this.condicion.ejecutar(entornoPara)
            } catch (e) {
                if(e instanceof Continue){
                    this.actualizacion.ejecutar(entornoPara)
                    condicion = this.condicion.ejecutar(entornoPara)
                    continue
                }
                throw e;
            }
        }
    }
}