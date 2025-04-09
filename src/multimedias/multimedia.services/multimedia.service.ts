import { QueryResult } from "pg";
import { pool } from "../../database/database";
import path from "path";
import fs from 'fs'


export const createMultimediaQuery= async (id_tabla_asociado:number, files: any[], tipo: number, tipo_nombre: string):Promise<any>=>{
    try {

        const values = files.map(file => `('${file.fileName}', '${file.mimetype}', ${tipo}, '${tipo_nombre}', ${id_tabla_asociado})`);    

        const response: QueryResult= await pool.query(`
            INSERT INTO multimedias(ruta, tipo_archivo, tipo, tipo_nombre, id_tabla_asociado)
             VALUES ` + values.join(', '));
        
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
export const updateMultimediaQuery= async (id_tabla_asociado:number, files: any[], tipo: number, tipo_nombre: string):Promise<any>=>{
    try {

        const values = files.map(file => `('${file.fileName}', '${file.mimetype}', ${tipo}, '${tipo_nombre}', ${id_tabla_asociado})`);    

        const response: QueryResult= await pool.query(`
            UPDATE multimedias(ruta, tipo_archivo, tipo, tipo_nombre, id_tabla_asociado)
             VALUES ` + values.join(', '));
        
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

export const deleteMultimediaQuery = async (multimedias: any[]): Promise<any> => {
    //DELETE FROM multimedias WHERE id_multimedia IN (1,2,3) ;
    try {

        const values = multimedias.map(m => m.id_multimedia).join(',');
        
        //console.log('values delete', values);        

        const response: QueryResult= await pool.query(`DELETE FROM multimedias WHERE id_multimedia IN (${values})`);

        //console.log('deleteMultimediaQuery', response);        
        
        let resp = {
            ok: true,
            msg: 'Se elimino el registro con exito',
            data: response
        }
        if(response.rowCount === 0) {
            resp.msg = 'Error al eliminar el registro'
        }

        // Eliminar cada archivo de forma concurrente usando Promise.all
        const promesasEliminacion = multimedias.map(async (m) => {
            const rutaArchivo = path.join(__dirname, '../../../public/uploads', m.ruta);
            await fs.promises.unlink(rutaArchivo);
        });
    
        // Esperar a que todas las promesas de eliminación se completen
        await Promise.all(promesasEliminacion);

        return resp;
        
    } catch (error) {
        const resp = {
            ok: false,
            msg: 'Error al eliminar el registro base de datos',
            data: error
        }
        return resp;
    }
}