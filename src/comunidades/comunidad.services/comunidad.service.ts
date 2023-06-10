import { QueryResult } from "pg";
import { pool } from "../../database/database";

export const getComunidadesQuery= async ():Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('SELECT * FROM comunidades');
        console.log(response);
        return response.rows;
    } catch (error) {
        return error;
    }
}
export const verComunidadQuery= async (id_comunidad:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('SELECT * FROM comunidades WHERE id_comunidad=$1',[id_comunidad]);
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
export const updateComunidadQuery= async (nombre:string,descripcion:string,superficie:number,poblacion:number,longitud:number,latitud:number,estado:number,id_usuario:number,id_comunidad:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE comunidades SET nombre=$1,descripcion=$2,superficie=$3,poblacion=$4,longitud=$5,latitud=$6,estado=$7,id_usuario=$8  WHERE id_comunidad=$9', [nombre,descripcion,superficie,poblacion,longitud,latitud,estado,id_usuario,id_comunidad]);
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
export const createComunidadQuery= async (nombre:string,descripcion:string,superficie:number,poblacion:number,longitud:number,latitud:number,estado:number,id_usuario:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('INSERT INTO comunidades(nombre,descripcion,superficie,poblacion,longitud,latitud,estado,id_usuario) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',[nombre,descripcion,superficie,poblacion,longitud,latitud,estado,id_usuario]);
        
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
export const deleteComunidadQuery= async (id_comunidad: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE comunidades SET estado=0 WHERE id_comunidad=$1', [id_comunidad]);
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
export const habilitarComunidadQuery= async (id_comunidad: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE comunidades SET estado=1 WHERE id_comunidad=$1', [id_comunidad]);
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