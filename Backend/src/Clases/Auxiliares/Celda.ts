import { Tipo } from "../Utilidades/Tipo";
import { Expresion } from "../Abstractas/Expresion";
//Celda dedicada para los arreglos [ a, b , c ]
export class Celda{
    constructor(
        public valores: Expresion[],      //Maximo 2 valores
    ){}

    public getY(): number{
        return this.valores.length
    }

    public anadirValor(valor: Expresion): void{
        this.valores.push(valor)
    }
}