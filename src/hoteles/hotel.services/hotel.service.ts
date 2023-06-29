import { QueryResult } from "pg";
import { pool } from "../../database/database";

export const getHotelesQuery= async ():Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('SELECT * FROM hoteles');
        console.log(response);
        return response.rows;
    } catch (error) {
        return error;
    }
}
export const verHotelQuery= async (id_hotel:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('SELECT * FROM hoteles WHERE id_hotel=$1',[id_hotel]);
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
export const updateHotelQuery= async (nombre:string,descripcion:string,direccion:string,tipo:string,categoria:string,num_habitaciones:number,telefono:number,foto:string,longitud:number,latitud:number,estado:number,id_comunidad:number, id_hotel: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE hoteles SET nombre=$1,descripcion=$2,direccion=$3,tipo=$4,categoria=$5,num_habitaciones=$6,telefono=$7,foto=$8,longitud=$9,latitud=$10,estado=$11,id_comunidad=$12 WHERE id_hotel=$13', [nombre,descripcion,direccion,tipo,categoria,num_habitaciones,telefono,foto,longitud,latitud,estado,id_comunidad,id_hotel]);
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
export const createHotelQuery= async (nombre:string,descripcion:string,direccion:string,tipo:string,categoria:string,num_habitaciones:number,telefono:number,foto:string,longitud:number,latitud:number,estado:number,id_comunidad:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('INSERT INTO hoteles(nombre,descripcion,direccion,tipo,categoria,num_habitaciones,telefono,foto,longitud,latitud,estado,id_comunidad) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',[nombre,descripcion,direccion,tipo,categoria,num_habitaciones,telefono,foto,longitud,latitud,estado,id_comunidad]);
        
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
export const deleteHotelQuery= async (id_hotel: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE hoteles SET estado=0 WHERE id_hotel=$1', [id_hotel]);
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
export const habilitarHotelQuery= async (id_hotel: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE hoteles SET estado=1 WHERE id_hotel=$1', [id_hotel]);
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