import { salidasConsola } from "../Utilidades/Salida";
import { Tipo } from "../Utilidades/Tipo";
import { Simbolo } from "./Simbolo";
import { SimboloTabla } from "./SimboloTabla";
import { tablaSimbolos } from "./Tabla";
import { Funcion } from "../Instrucciones/Funcion";

export class Entorno {
    public ids: Map<string, Simbolo> = new Map<string, Simbolo>()
    public objetos: Map<string, any> = new Map<string, any>()
    public funciones: Map<string, any> = new Map<string, any>

    constructor(
        private anterior: Entorno | null,
        public nombre: string
    ){

    }

    public guardarVariable(id: string, valor: any, tipo: Tipo, linea: number, columna: number){
        let entornoActual: Entorno = this;
        if(!entornoActual.ids.has(id)){
            //Si la id de la variable no existe, se guarda
            entornoActual.ids.set(id, new Simbolo(valor, id, tipo))
            //Insertar en la tabla de simbolos
            tablaSimbolos.agregarSimbolo(new SimboloTabla(linea, columna, true, true, tipo, id, entornoActual.nombre))
        }
        //Error semantico, la variable ya existe
    }

    public getVariable(id: string): Simbolo | null {
        let entorno: Entorno | null = this
        while(entorno != null){
            if(entorno.ids.has(id)){
                return entorno.ids.get(id)!
            }
            entorno = entorno.anterior
        }
        return null
    }

    public modificarVariable(id: string, valor: any){
        let entorno: Entorno | null = this
        while(entorno != null){
            if(entorno.ids.has(id)){
                entorno.ids.get(id)!.valor = valor
            }
            entorno = entorno.anterior
        }
    }

    public guardarFuncion(id: string, funcion: Funcion){
        let entornoActual: Entorno = this
        if(!entornoActual.funciones.has(id)){
            //La funcion es guardada
            entornoActual.funciones.set(id, funcion)
            //Se inserta en la tabla de simbolos
            tablaSimbolos.agregarSimbolo(new SimboloTabla(funcion.linea, funcion.columna, false, false, funcion.tipo, id, entornoActual.nombre))
        }
        //Error semantico: la funcion ya existe
    }

    public getFuncion(id: string): Funcion | null {
        let entorno: Entorno | null = this
        while (entorno != null){
            if(entorno.funciones.has(id)){
                return entorno.funciones.get(id)!
            }
            entorno = entorno.anterior
        }
        return null
    }

    public setPrint(print: string){
        salidasConsola.push(print)
    }
}