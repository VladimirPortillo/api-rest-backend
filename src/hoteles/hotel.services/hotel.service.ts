import { QueryResult } from "pg";
import { pool } from "../../database/database";

export const getHotelesQuery= async ():Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('SELECT * FROM hoteles');
        //console.log(response);
        return response.rows;
    } catch (error) {
        return error;
    }
}
export const verHotelQuery= async (id_hotel:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('SELECT * FROM hoteles WHERE id_hotel=$1',[id_hotel]);
        console.log(response);
        const multimedia: QueryResult = await pool.query(`
            SELECT m.id_multimedia, m.ruta, m.tipo_Archivo 
            FROM multimedias m where m.tipo = 5 
            AND m.estado = 1 
            AND m.id_tabla_asociado = $1`, [id_hotel]);
        //console.log('multimedia', multimedia);

        const hotel = response.rows[0];

        hotel.multimedias = multimedia.rows;
        let resp = {
            ok: true,
            msg: 'Se recupero el registro con exito',
            data: hotel
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
export const updateHotelQuery= async (nombre:string,descripcion:string,direccion:string,estrellas:string,telefono:number,garaje:string,alimentacion:string,aire_acondicionado:string,longitud:number,latitud:number,estado:number,id_comunidad:number, id_hotel: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query(`
            UPDATE hoteles 
            SET nombre=$1,descripcion=$2,direccion=$3,estrellas=$4,telefono=$5,garaje=$6,alimentacion=$7,aire_acondicionado=$8,longitud=$9,latitud=$10,estado=$11,id_comunidad=$12 
            WHERE id_hotel=$13`, [nombre,descripcion,direccion,estrellas,telefono,garaje,alimentacion,aire_acondicionado,longitud,latitud,estado,id_comunidad,id_hotel]);
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
export const createHotelQuery= async (nombre:string,descripcion:string,direccion:string,estrellas:string,telefono:number,garaje:string,alimentacion:string,aire_acondicionado:string,longitud:number,latitud:number,estado:number,id_comunidad:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('INSERT INTO hoteles(nombre,descripcion,direccion,estrellas,telefono,garaje,alimentacion,aire_acondicionado,longitud,latitud,estado,id_comunidad) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id_hotel',[nombre,descripcion,direccion,estrellas,telefono,garaje,alimentacion,aire_acondicionado,longitud,latitud,estado,id_comunidad]);
        
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