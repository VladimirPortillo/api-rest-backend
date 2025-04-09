import { QueryResult } from "pg";
import { pool } from "../../database/database";

export const getAtractivosQuery= async ():Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('SELECT * FROM atractivos_turisticos');
        return response.rows;
    } catch (error) {
        return error;
    }
}
export const verAtractivoQuery= async (id_atractivo:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('SELECT * FROM atractivos_turisticos WHERE id_atractivo=$1',[id_atractivo]);
        const multimedia: QueryResult = await pool.query(`
                        SELECT m.id_multimedia, m.ruta, m.tipo_Archivo 
                        FROM multimedias m where m.tipo = 4 
                        AND m.estado = 1 
                        AND m.id_tabla_asociado = $1`, [id_atractivo]);
        const atractivo = response.rows[0];

        atractivo.multimedias = multimedia.rows;
        console.log(response);
        let resp = {
            ok: true,
            msg: 'Se recupero el registro con exito',
            data: atractivo
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
export const updateAtractivoQuery= async (nombre:string,descripcion:string,direccion:string,longitud:number,latitud:number,estado:number,id_comunidad:number,id_atractivo:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE atractivos_turisticos SET nombre=$1,descripcion=$2,direccion=$3,longitud=$4,latitud=$5,estado=$6,id_comunidad=$7 WHERE id_atractivo=$8', [nombre,descripcion,direccion,longitud,latitud,estado,id_comunidad,id_atractivo]);
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
export const createAtractivoQuery= async (nombre:string,descripcion:string,direccion:string,longitud:number,latitud:number,estado:number,id_comunidad:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('INSERT INTO atractivos_turisticos(nombre,descripcion,direccion,longitud,latitud,estado,id_comunidad) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id_atractivo',[nombre,descripcion,direccion,longitud,latitud,estado,id_comunidad]);
        
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
export const deleteAtractivoQuery= async (id_atractivo: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE atractivos_turisticos SET estado=0 WHERE id_atractivo=$1', [id_atractivo]);
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
export const habilitarAtractivoQuery= async (id_atractivo: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE atractivos_turisticos SET estado=1 WHERE id_atractivo=$1', [id_atractivo]);
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

    

