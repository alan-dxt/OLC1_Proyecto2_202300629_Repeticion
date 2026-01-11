import { errores, salidasConsola } from "../Utilidades/Salida";
import { Tipo, TipoRetorno } from "../Utilidades/Tipo";
import { Simbolo } from "./Simbolo";
import { SimboloTabla } from "./SimboloTabla";
import { tablaSimbolos } from "./Tabla";
import { Funcion } from "../Instrucciones/Funcion";
import { Procedimiento } from "../Instrucciones/Procedimiento";
import { Error } from "../Utilidades/Error";
import { TipoError } from "../Utilidades/TipoError";

//Espacio de almacenamiento de lo que se ejecuta
//Entorno <--> Bloque
//Sin Entorno no existe memoria
export class Entorno {
    public ids: Map<string, Simbolo> = new Map<string, Simbolo>()                           //Variables
    public objetos: Map<string, any> = new Map<string, any>()                               //Objetos 
    public funciones: Map<string, Funcion> = new Map<string, Funcion>()                     //Funciones
    public procedimientos: Map<string, Procedimiento> = new Map<string, Procedimiento>()    //Procedimientos

    constructor(
        private anterior: Entorno | null,
        public nombre: string
    ){}

    public guardarVariable(
        id: string,
        valor: any,
        tipo: Tipo,
        linea: number,
        columna: number){

        if(this.ids.has(id)){
            //La variable ya existe
            errores.push(new Error(
                linea, 
                columna,
                TipoError.SEMANTICO,
                `La variable '${id}' ya existe en el ámbito ${this.nombre}`
            ))
            return
        }
        //La variable no existe aun
        //se agrega a las id's y a la tabla
        this.ids.set(id,new Simbolo(valor, id, tipo))
        tablaSimbolos.agregarSimbolo(new SimboloTabla(linea, columna, true, true, tipo, id, this.nombre))
    }

    public getVariable(id: string): Simbolo | null {
        let entorno: Entorno | null = this
        while(entorno != null){
            if(entorno.ids.has(id)){
                return entorno.ids.get(id)!
            }
            entorno = entorno.anterior
        }
        //Agregar el error
        errores.push(new Error(
                0,
                0,
                TipoError.SEMANTICO,
                `La variable '${id}' no existe`
        ))
        return null
    }

    public modificarVariable(id: string, nuevoValor: TipoRetorno, linea: number, columna: number){
        let entorno: Entorno | null = this
        while(entorno != null){
            if(entorno.ids.has(id)){
                const simbolo: Simbolo = entorno.ids.get(id)!
                //Verificacion de los tipos
                if(simbolo.tipo !== nuevoValor.tipo){
                    errores.push(
                        new Error(
                            linea,
                            columna,
                            TipoError.SEMANTICO,
                            `No se puede asignar un valor de tipo ${nuevoValor.tipo} a la variable ${id} de tipo ${Tipo[simbolo.tipo]}`
                        )
                    )
                    return
                }
                //Reasignacion valida
                simbolo.valor = nuevoValor.valor
                return
            }
            entorno = entorno.anterior
        }
        errores.push(new Error(
                        linea,
                        columna,
                        TipoError.SEMANTICO,
                        `La variable '${id}' no existe`
        ))
    }

    public guardarFuncion(id: string, funcion: Funcion){
        if(this.funciones.has(id)){
            //La funcion ya existe
            errores.push(new Error(
                            funcion.linea,
                            funcion.columna,
                            TipoError.SEMANTICO,
                            `La funcion '${id}' ya existe`
                        ))
            return
        }
        //La funcion no existe todavia
        //Se guarda en la lista de funciones y en la tabla
        this.funciones.set(id, funcion)
        tablaSimbolos.agregarSimbolo(new SimboloTabla(
                                        funcion.linea,
                                        funcion.columna,
                                        false,
                                        false,
                                        funcion.tipo,
                                        id,
                                        this.nombre
                                    ))
    }

    public guardarProcedimiento(id: string, procedimiento: Procedimiento){
        if(this.procedimientos.has(id) || this.funciones.has(id) || this.ids.has(id)){
            //La id del procedimiento ya se encuentra ocupada
            errores.push(new Error(
                            procedimiento.linea,
                            procedimiento.columna,
                            TipoError.SEMANTICO,
                            `La id '${id}' del procedimiento ya se encuentra en uso`
                        ))
            return
        }
        //El procedimineto no existe todavia
        //Se guarda en la lista de procedimientos y en la tabla(No tiene valor de retorno - NULL)
        this.procedimientos.set(id, procedimiento)
        tablaSimbolos.agregarSimbolo(new SimboloTabla(
                                        procedimiento.linea,
                                        procedimiento.columna,
                                        false,
                                        false,
                                        Tipo.NULL,
                                        id,
                                        this.nombre
                                    ))
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

    public gerProcedimiento(id: string): Procedimiento | null {
        let entorno: Entorno | null = this
        while (entorno != null){
            if(entorno.procedimientos.has(id)){
                return entorno.procedimientos.get(id)!
            }
            entorno = entorno.anterior
        }
        return null
    }

    public setPrint(print: string){
        salidasConsola.push(print)
    }
}