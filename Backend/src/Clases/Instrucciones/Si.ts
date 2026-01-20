import { Expresion } from "../Abstractas/Expresion";
import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Bloque } from "./Bloque";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";
import { errores } from "../Utilidades/Salida";
import { Error } from "../Utilidades/Error";
import { TipoError } from "../Utilidades/TipoError";
import { Tipo } from "../Utilidades/Tipo";

export class Si extends Instruccion {
    constructor(
        linea: number,
        columna: number,
        public condicion: Expresion,
        public InstruccionesPrimarias: Instruccion[],
        public O_Si: Array<{ condicion: Expresion, instrucciones: Instruccion[] }> | null,
        public deLoContrario: Instruccion[] | null
    ) {
        super(linea, columna, tipoInstruccion.SI)
    }

    public ejecutar(entorno: Entorno) {
        const condicionPrimaria = this.condicion.ejecutar(entorno)
        if(condicionPrimaria.tipo !== Tipo.BOOLEANO){
            errores.push(
                new Error(
                    this.linea,
                    this.columna,
                    TipoError.SEMANTICO,
                    `Se esperaba una condicion del tipo BOOLEANO pero se obtuvo ${Tipo[condicionPrimaria.tipo]}`
                )
            )
            return
        }
        if (condicionPrimaria.valor === true) {
            const bloqueEntonces = new Bloque(this.linea, this.columna, this.InstruccionesPrimarias)
            bloqueEntonces.ejecutar(new Entorno(entorno, "SI"))
            return
        }
        if(this.O_Si){
            for (const rama of this.O_Si) {
                const condicionSecundariaActual = rama.condicion.ejecutar(entorno)
                    if(condicionSecundariaActual.tipo !== Tipo.BOOLEANO){
                        errores.push(
                            new Error(
                                this.linea,
                                this.columna,
                                TipoError.SEMANTICO,
                                `Se esperaba una condicion del tipo BOOLEANO pero se obtuvo ${Tipo[condicionPrimaria.tipo]}`
                            )
                        )
                        return
                    }
                if (condicionSecundariaActual.valor === true) {
                    //console.log("condicion secundaria verdadera")
                    //console.log("instrucciones: " + rama.instrucciones)
                    const bloqueOSiActual = new Bloque(this.linea, this.columna, rama.instrucciones)
                    bloqueOSiActual.ejecutar(new Entorno(entorno, "O_SI"))
                    return
                }
            }
        }
        if (this.deLoContrario !== null) {
            const deLoContrario = new Bloque(this.linea, this.columna, this.deLoContrario)
            deLoContrario.ejecutar(new Entorno(entorno, "DE_LO_CONTRARIO"))
        }
    }
}
