import  { Request , Response} from "express";
import {generarJWT} from "../../helpers/jwt";

const bcrypt= require ('bcryptjs');

import {  createUsuarioQuery, 
          deleteUsuarioQuery, 
          getUsuariosQuery, 
          habilitarUsuarioQuery, 
          logUserQuery, 
          updateUsuarioQuery, 
          verUsuarioQuery
     } from "../services/user.service"; 

export class UserController { 
     //logueo 
     async loginUsuario(req:Request,res:Response){
          const usuario=req.body.usuario;
          const contrasena=req.body.contrasena;
          // console.log('usuario:'+usuario);
          // console.log('contrasena:'+contrasena);
          try {
               // const bduser= await 
               const users=await logUserQuery(usuario,contrasena); 
               
               // console.log('usuariobd:', users);
               //console.log('usuariobd:', users.rows[0]);
               if(users.length === 0){
                    return res.status(400).json({
                         ok:false,
                         msg:'el usuario o contraseña es incorrecto'
                    })
               }
               const validadContra=bcrypt.compareSync(contrasena,users[0].contrasena);
               console.log('validadContra', validadContra);
               
               if(!validadContra){
                    return res.status(400).json({
                         ok:false,
                         msg:'el usuario o contraseña es incorrecto'
                    })
               }
              
               const token=generarJWT(users[0].id_usuario,users[0].nombre);

               return res.json({
                    ok:true,
                    iud:users[0].id_usuario,
                    name:users[0].nombre,
                    token
               })
               
          } catch (error) {
               // console.log(error)
               return res.status(500).json({
                    ok:false,
                    msg:'error en servidor'
               })
          }
     }
     //lista usuarios  
     async getUsuarios (req:Request, res:Response){      
          try {
               const data= await getUsuariosQuery();
               res.status(200).json(data);
          } catch (e) {
               console.log(e)
          }    
     }
     //ver usuario
     async verUsuario (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const data= await verUsuarioQuery(id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
    }
     //modificar un usuario
       async updateUsuario (req:Request, res:Response){   
             const id=parseInt(req.params.id);
             console.log('req.body', req.body);             
             const {nombre}=req.body;
             const {ap}=req.body;
             const {am}=req.body;
             const {ci}=req.body;
             const {fecha_nac}=req.body;
             const {usuario}=req.body;
             const {contrasena}=req.body;
             const {estado}=req.body;
             const {id_rol}=req.body;
             const data= await updateUsuarioQuery(nombre,ap,am,ci,fecha_nac,usuario,contrasena,estado,id_rol,id);
             
             if(!data.ok) {
                  res.status(500).json(data);
             } 
             res.status(200).json(data);
       }
     //crear un nuevo usuario
       async createUsuario (req:Request, res:Response){   
             //const {id_usuario}=req.body;
             const {nombre}=req.body;
             const {ap}=req.body;
             const {am}=req.body;
             const {ci}=req.body;
             const {fecha_nac}=req.body;
             const {usuario}=req.body;
             const {contrasena}=req.body;
             const {estado}=req.body;
             const {id_rol}=req.body;
             //console.log(nombre,ap,am,ci,fecha_nac,usuario,contrasena,estado,id_rol);
             //encriptacion de la contrasena
             const salt=bcrypt.genSaltSync(10);
             const contra=bcrypt.hashSync(contrasena,salt);  

             const data= await createUsuarioQuery(nombre,ap,am,ci,fecha_nac,usuario,contra,estado,id_rol);
             
             //token
          const token=generarJWT(data.id_usuario,usuario);

             if(!data.ok) {
                  res.status(500).json(data);
             } 
             res.status(200).json({
               data,
               token
             });
        }
     //eliminar usuario
        async deleteUsuario (req:Request, res:Response){   
             const id=parseInt(req.params.id);
             const data= await deleteUsuarioQuery(id);
             
             if(!data.ok) {
                  res.status(500).json(data);
             } 
             res.status(200).json(data);
       }
     //habilitar un usuario
       async habilitarUsuario (req:Request, res:Response){   
             const id=parseInt(req.params.id);
             const data= await habilitarUsuarioQuery(id);
             
             if(!data.ok) {
                  res.status(500).json(data);
             } 
             res.status(200).json(data);
        }
        
        encriptarContrasenia (req:Request, res:Response) {
          const contrasena=req.body.contrasena;
          const salt=bcrypt.genSaltSync(10);
          const contra=bcrypt.hashSync(contrasena,salt);
          res.status(200).json({
               contrasenia_sin_encriptar: contrasena,
               contrasenia_encriptada: contra
          }) 
        }
 }
 