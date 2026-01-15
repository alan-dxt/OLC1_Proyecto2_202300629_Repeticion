import { Tipo } from "../Utilidades/Tipo";

export class Parametro{
    constructor(
        public id: string,
        public tipo: Tipo,
        public linea: number,
        public columna: number
    ){}
}