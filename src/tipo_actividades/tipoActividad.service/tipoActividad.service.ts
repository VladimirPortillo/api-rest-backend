import { QueryResult } from "pg";
import { pool } from "../../database/database";
export const getTipoActividadesQuery= async ():Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('SELECT * FROM tipos');
        //console.log(response);
        return response.rows;
    } catch (error) {
        return error;
    }
    
}
export const verTipoActividadQuery= async (id_tipo:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('SELECT * FROM tipos WHERE id_tipo=$1',[id_tipo]);
        console.log(response);
        let resp = {
            ok: true,
            msg: 'Se recupero el registro con exito',
            data: response.rows
        }
        return resp;
    } catch (error) {
        const resp = {
            ok: false,
            msg: 'Error al recuperar el registro base de datos',
            data: error
        }
        return resp;
    }
}
export const createTipoActividadQuery= async (nombre:string,descripcion:string,estado:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('INSERT INTO tipos(nombre,descripcion,estado) VALUES ($1,$2,$3)',[nombre,descripcion,estado]);
        
        let resp = {
            ok: true,
            msg: 'Se agrego el registro con exito',
            data: response
        }
        if(response.rowCount === 0) {
            resp.msg = 'Error al agregar el registro'
        }
        return resp;

    } catch (error) {
        const resp = {
            ok: false,
            msg: 'Error al agregar el registro base de datos',
            data: error
        }
        return resp;
    }
    
}
export const updateTipoActividadQuery= async (nombre: String,descripcion:String,estado:number,id_tipo: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE tipos SET nombre=$1,descripcion=$2,estado=$3 WHERE id_tipo=$4', [nombre,descripcion,estado,id_tipo]);
        //return response;
        let resp = {
            ok: true,
            msg: 'Se actualizo el registro con exito',
            data: response
        }
        if(response.rowCount === 0) {
            resp.msg = 'No se encontro ningun registro con el identiicador'
        }
        return resp;
        
    } catch (error) {
        const resp = {
            ok: false,
            msg: 'Error al actualizar el registro',
            data: error
        }
        return resp;
    }

}
export const deleteTipoActividadQuery= async (id_tipo: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE tipos SET estado=0 WHERE id_tipo=$1', [id_tipo]);
        //return response;
        let resp = {
            ok: true,
            msg: 'Se elimino el registro con exito',
            data: response
        }
        if(response.rowCount === 0) {
            resp.msg = 'No se encontro ningun registro con el identificador'
        }
        return resp;
        
    } catch (error) {
        const resp = {
            ok: false,
            msg: 'Error al eliminar el registro',
            data: error
        }
        return resp;
    }

}
export const habilitarTipoActividadQuery= async (id_tipo: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE tipos SET estado=1 WHERE id_tipo=$1', [id_tipo]);
        let resp = {
            ok: true,
            msg: 'Se habilito el registro con exito',
            data: response
        }
        if(response.rowCount === 0) {
            resp.msg = 'No se encontro ningun registro con el identificador'
        }
        return resp;
        
    } catch (error) {
        const resp = {
            ok: false,
            msg: 'Error al habilitar el registro',
            data: error
        }
        return resp;
    }

}