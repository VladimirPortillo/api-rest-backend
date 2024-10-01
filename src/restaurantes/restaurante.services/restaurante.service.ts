import { QueryResult } from "pg";
import { pool } from "../../database/database";

export const getRestaurantesQuery= async ():Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('SELECT * FROM restaurantes');
        //console.log(response);
        return response.rows;
    } catch (error) {
        return error;
    }
}
export const verRestauranteQuery= async (id_restaurante:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('SELECT * FROM restaurantes WHERE id_restaurante=$1',[id_restaurante]);
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
export const updateRestauranteQuery= async (nombre:string,descripcion:string,direccion:string,categoria:string,telefono:number,foto:string,longitud:number,latitud:number,estado:number,id_comunidad:number,id_restaurante:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE restaurantes SET nombre=$1,descripcion=$2,direccion=$3,categoria=$4,telefono=$5,foto=$6,longitud=$7,latitud=$8,estado=$9,id_comunidad=$10 WHERE id_restaurante=$11', [nombre,descripcion,direccion,categoria,telefono,foto,longitud,latitud,estado,id_comunidad,id_restaurante]);
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
export const createRestauranteQuery= async (nombre:string,descripcion:string,direccion:string,categoria:string,telefono:number,foto:string,longitud:number,latitud:number,estado:number,id_comunidad:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('INSERT INTO restaurantes(nombre,descripcion,direccion,categoria,telefono,foto,longitud,latitud,estado,id_comunidad) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',[nombre,descripcion,direccion,categoria,telefono,foto,longitud,latitud,estado,id_comunidad]);
        
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
export const deleteRestauranteQuery= async (id_restaurante: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE restaurantes SET estado=0 WHERE id_restaurante=$1', [id_restaurante]);
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
export const habilitarRestauranteQuery= async (id_restaurante: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE restaurantes SET estado=1 WHERE id_restaurante=$1', [id_restaurante]);
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