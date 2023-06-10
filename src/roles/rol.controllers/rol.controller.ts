import  { Request , Response} from "express";
import {  createRolQuery, deleteRolQuery, getRolesQuery,habilitarRolQuery,updateRolQuery, verRolQuery} from "../rol.services/rol.service"; 

export class RolController {    
     //lista todos los roles 
    async getRoles (req:Request, res:Response){   
        
       try {
            const data= await getRolesQuery();
            res.status(200).json(data);
       } catch (e) {
            console.log(e)
       }    
    }
    //actualiza un nuevo rol
    async updateRol (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const {nombre}=req.body;
          const data= await updateRolQuery(nombre,id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
    }
       //ver un nuevo rol
     async verRol (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const data= await verRolQuery(id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
    }
    //crea un nuevo rol
    async createRol (req:Request, res:Response){   
          const {nombre}=req.body;
          const {estado}=req.body;
     
          const data= await createRolQuery(nombre,estado);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
     }
     //elimina de manera logica un rol
     async deleteRol (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const data= await deleteRolQuery(id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
    }
    //habilitar  un rol
    async habilitarRol (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const data= await habilitarRolQuery(id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
     }
 }
 