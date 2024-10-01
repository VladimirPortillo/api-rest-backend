import { QueryResult } from "pg";
import { pool } from "../../database/database";

export const getMenusQuery= async ():Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('SELECT * FROM menus');
        //console.log(response);
        return response.rows;
    } catch (error) {
        return error;
    }
}
export const verMenuQuery= async (id_menu:number):Promise<any>=>{
    console.log('ver id_rol',id_menu);
    try {
        const response: QueryResult= await pool.query('SELECT * FROM menus WHERE id_menu=$1',[id_menu]);
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
export const updateMenuQuery= async (nombre: String,url:String,estado:number,id_menu: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE menus SET nombre=$1,url=$2,estado=$3 WHERE id_menu=$4', [nombre,url,estado,id_menu]);
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
export const createMenuQuery= async (nombre:string,url:string,estado:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('INSERT INTO menus(nombre,url,estado) VALUES ($1,$2,$3)',[nombre,url,estado]);
        
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
export const deleteMenuQuery= async (id_menu: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE menus SET estado=0 WHERE id_menu=$1', [id_menu]);
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
export const habilitarMenuQuery= async (id_menu: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE menus SET estado=1 WHERE id_menu=$1', [id_menu]);
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