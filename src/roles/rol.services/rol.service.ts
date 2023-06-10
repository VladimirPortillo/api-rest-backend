import { QueryResult } from "pg";
import { pool } from "../../database/database";

export const getRolesQuery= async ():Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('SELECT * FROM roles');
        console.log(response);
        return response.rows;
    } catch (error) {
        return error;
    }
}

export const updateRolQuery= async (nombre: String, id_rol: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE roles SET nombre=$1 WHERE id_rol=$2', [nombre,id_rol]);
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
export const verRolQuery= async (id_rol:number):Promise<any>=>{
    console.log('ver id_rol',id_rol);
    try {
        const response: QueryResult= await pool.query('SELECT * FROM roles WHERE id_rol=$1',[id_rol]);
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
export const createRolQuery= async (nombre:string,estado:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('INSERT INTO roles(nombre,estado) VALUES ($1,$2)',[nombre,estado]);
        
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
export const deleteRolQuery= async (id_rol: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE roles SET estado=0 WHERE id_rol=$1', [id_rol]);
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
export const habilitarRolQuery= async (id_rol: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE roles SET estado=1 WHERE id_rol=$1', [id_rol]);
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