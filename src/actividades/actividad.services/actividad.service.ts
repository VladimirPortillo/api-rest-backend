import { QueryResult } from "pg";
import { pool } from "../../database/database";

export const getActividadesQuery= async ():Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('SELECT * FROM actividades');
        return response.rows;
    } catch (error) {
        return error;
    }
}
export const updateActividadQuery= async (nombre:string,descripcion:string,direccion:string,fecha_inicio:string,fecha_fin:string,longitud:number,latitud:number,estado:number,id_actividad:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE actividades SET nombre=$1,descripcion=$2,direccion=$3,fecha_inicio=$4,fecha_fin=$5,longitud=$6,latitud=$7,estado=$8 WHERE id_actividad=$9', [nombre,descripcion,direccion,fecha_inicio,fecha_fin,longitud,latitud,estado,id_actividad]);
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
export const createActividadQuery= async (id_actividad:number,nombre:String,descripcion:String,direccion:String,fecha_inicio:String,fecha_fin:String,longitud:number,latitud:number,estado:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('INSERT INTO actividades(id_actividad,nombre,descripcion,direccion,fecha_inicio,fecha_fin,longitud,latitud,estado) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',[id_actividad,nombre,descripcion,direccion,fecha_inicio,fecha_fin,longitud,latitud,estado]);
        
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
export const deleteActividadQuery= async (id_actividad: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE actividades SET estado=0 WHERE id_actividad=$1', [id_actividad]);
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
export const habilitarActividadQuery= async (id_actividad: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE actividades SET estado=1 WHERE id_actividad=$1', [id_actividad]);
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

    

