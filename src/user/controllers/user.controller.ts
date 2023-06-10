import  { Request , Response} from "express";
import {  createUsuarioQuery, deleteUsuarioQuery, getUsuariosQuery, habilitarUsuarioQuery, updateUsuarioQuery, verUsuarioQuery} from "../services/user.service"; 

export class UserController {    
         //lista todos los roles 
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
       //actualiza un nuevo rol
       async updateUsuario (req:Request, res:Response){   
             const id=parseInt(req.params.id);
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
       //crea un nuevo rol
       async createUsuario (req:Request, res:Response){   
             const {id_usuario}=req.body;
             const {nombre}=req.body;
             const {ap}=req.body;
             const {am}=req.body;
             const {ci}=req.body;
             const {fecha_nac}=req.body;
             const {usuario}=req.body;
             const {contrasena}=req.body;
             const {estado}=req.body;
             const {id_rol}=req.body;
             console.log(id_usuario,nombre,ap,am,ci,fecha_nac,usuario,contrasena,estado,id_rol);
             const data= await createUsuarioQuery(id_usuario,nombre,ap,am,ci,fecha_nac,usuario,contrasena,estado,id_rol);
             
             if(!data.ok) {
                  res.status(500).json(data);
             } 
             res.status(200).json(data);
        }
        //elimina de manera logica un rol
        async deleteUsuario (req:Request, res:Response){   
             const id=parseInt(req.params.id);
             const data= await deleteUsuarioQuery(id);
             
             if(!data.ok) {
                  res.status(500).json(data);
             } 
             res.status(200).json(data);
       }
       //habilitar  un rol
       async habilitarUsuario (req:Request, res:Response){   
             const id=parseInt(req.params.id);
             const data= await habilitarUsuarioQuery(id);
             
             if(!data.ok) {
                  res.status(500).json(data);
             } 
             res.status(200).json(data);
        }
 }
 