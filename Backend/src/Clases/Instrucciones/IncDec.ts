import { Instruccion } from "../Abstractas/Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { tipoInstruccion } from "../Utilidades/TipoInstruccion";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { errores } from "../Utilidades/Salida";
import { Error } from "../Utilidades/Error";
import { TipoError } from "../Utilidades/TipoError";

export class IncDec extends Instruccion{

    constructor(
        linea: number,
        columna: number,
        private id: string,
        private signo: string
    ){
        super(
            linea,
            columna,
            tipoInstruccion.IncDec
        )
    }

    public ejecutar(entorno: Entorno): void {
        switch(this.signo){
            case("++"):
                return this.adicion(entorno)
            case("--"):
                return this.sustraccion(entorno)
            default:
                errores.push(
                    new Error(
                        this.linea,
                        this.columna,
                        TipoError.SINTACTICO,
                        `El simbolo ${this.signo} no es aplicable para la incrementos/decrementos`
                    )
                )
        }
    }

    private adicion(entorno: Entorno): void {
        const simbolo = entorno.getVariable(this.id);
        if(simbolo === null){
            return
        }
        if (simbolo.tipo !== Tipo.ENTERO && simbolo.tipo !== Tipo.DECIMAL) {
            errores.push(
                new Error(
                    this.linea,
                    this.columna,
                    TipoError.SEMANTICO,
                    `El tipo ${Tipo[simbolo.tipo]} no admite incrementos`
                )
            );
            return;
        }
        simbolo.valor += 1;
    }


    private sustraccion(entorno: Entorno): void {
        const simbolo = entorno.getVariable(this.id);
        if(simbolo === null){
            return
        }
        if (simbolo.tipo !== Tipo.ENTERO && simbolo.tipo !== Tipo.DECIMAL) {
            errores.push(
                new Error(
                    this.linea,
                    this.columna,
                    TipoError.SEMANTICO,
                    `El tipo ${Tipo[simbolo.tipo]} no admite decrementos`
                )
            );
            return;
        }
        simbolo.valor -= 1;
    }


}
