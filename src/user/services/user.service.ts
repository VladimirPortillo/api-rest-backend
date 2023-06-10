import { QueryResult } from "pg";
import { pool } from "../../database/database";

export const getUsuariosQuery= async ():Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('SELECT * FROM usuarios');
        return response.rows;
    } catch (error) {
        return error;
    }
}
export const verUsuarioQuery= async (id_usuario:number):Promise<any>=>{
    console.log('ver id_rol',id_usuario);
    try {
        const response: QueryResult= await pool.query('SELECT * FROM usuarios WHERE id_usuario=$1',[id_usuario]);
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
export const updateUsuarioQuery= async (nombre:string,ap:string,am:string,ci:number,fecha_nac:string,usuario:string,contrasena:string,estado: number,id_rol:number,id_usuario:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE usuarios SET nombre=$1,ap=$2,am=$3,ci=$4,fecha_nac=$5,usuario=$6,contrasena=$7,estado=$8,id_rol=$9 WHERE id_usuario=$10', [nombre,ap,am,ci,fecha_nac,usuario,contrasena,estado,id_rol,id_usuario]);
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
export const createUsuarioQuery= async (id_usuario:number,nombre:string,ap:string,am:string,ci:number,fecha_nac:string,usuario:string,contrasena:string,estado: number,id_rol:number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('INSERT INTO usuarios(id_usuario,nombre,ap,am,ci,fecha_nac,usuario,contrasena,estado,id_rol) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',[id_usuario,nombre,ap,am,ci,fecha_nac,usuario,contrasena,estado,id_rol]);
        
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
export const deleteUsuarioQuery= async (id_usuario: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE usuarios SET estado=0 WHERE id_usuario=$1', [id_usuario]);
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
export const habilitarUsuarioQuery= async (id_usuario: number):Promise<any>=>{
    try {
        const response: QueryResult= await pool.query('UPDATE usuarios SET estado=1 WHERE id_usuario=$1', [id_usuario]);
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

    

