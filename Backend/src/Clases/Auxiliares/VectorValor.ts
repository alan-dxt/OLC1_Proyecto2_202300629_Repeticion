import { Tipo, TipoRetorno } from "../Utilidades/Tipo";

export class VectorValor{
    constructor(
        public linea: number,
        public columna: number,
        public tipo: Tipo,
        public nombre: string,
        public valores: TipoRetorno[][],
        public x: number,
        public y: number
    ){}
}