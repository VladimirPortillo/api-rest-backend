import { QueryResult } from "pg";
import { pool } from "../../database/database";

export const getGastronomiasQuery= async ():Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('SELECT * FROM gastronomias');
        //console.log(response);
        return response.rows;
    } catch (error) {
        return error;
    }
}
export const verGastronomiaQuery= async (id_gastronomia:number):Promise<any>=>{
    console.log(id_gastronomia);
    try {
        const response: QueryResult= await pool.query('SELECT * FROM gastronomias WHERE id_gastronomia=$1',[id_gastronomia]);
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
export const updateGastronomiaQuery= async (nombre:string,descripcion:string,tipo:string,estado:number,id_comunidad:number, id_gastronomia: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE gastronomias SET nombre=$1,descripcion=$2,tipo=$3,estado=$4,id_comunidad=$5 WHERE id_gastronomia=$6', [nombre,descripcion,tipo,estado,id_comunidad,id_gastronomia]);
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
export const createGastronomiaQuery= async (nombre:string,descripcion:string,tipo:string,estado:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('INSERT INTO gastronomias(nombre,descripcion,tipo,estado) VALUES ($1,$2,$3,$4)',[nombre,descripcion,tipo,estado]);
        
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
export const deleteGastronomiaQuery= async (id_gastronomia: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE gastronomias SET estado=0 WHERE id_gastronomia=$1', [id_gastronomia]);
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
export const habilitarGastronomiaQuery= async (id_gastronomia: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE gastronomias SET estado=1 WHERE id_gastronomia=$1', [id_gastronomia]);
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