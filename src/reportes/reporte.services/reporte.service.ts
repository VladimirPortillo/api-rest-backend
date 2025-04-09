import { QueryResult } from "pg";
import { pool } from "../../database/database";
export const verComunidadActividadesQuery= async (id_comunidad:number,fecha_inic:string,fecha_fin:string):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query(`
            SELECT  c.nombre, a.* 
            FROM comunidades c,actividades a 
            WHERE a.id_comunidad = c.id_comunidad 
            AND a.id_comunidad=$1 
            AND a.fecha_inicio >= $2 
            AND a.fecha_fin <= $3`
            ,[id_comunidad,fecha_inic,fecha_fin]);
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