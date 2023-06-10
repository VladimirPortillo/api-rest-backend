import  { Request , Response} from "express";
import {  createMenuQuery, deleteMenuQuery, getMenusQuery,habilitarMenuQuery,updateMenuQuery, verMenuQuery} from "../menu.services/menu.service"; 

export class MenuController {    
     //lista todos los roles 
    async getMenus (req:Request, res:Response){   
        
       try {
            const data= await getMenusQuery();
            res.status(200).json(data);
       } catch (e) {
            console.log(e)
       }    
    }
     //ver un nuevo rol
     async verMenu (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const data= await verMenuQuery(id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
    }

    //actualiza un nuevo rol
    async updateMenu (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const {nombre}=req.body;
          const {url}=req.body;
          const {estado}=req.body;
          const data= await updateMenuQuery(nombre,url,estado,id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
    }
    //crea un nuevo menu
    async createMenu (req:Request, res:Response){   
          
          const {nombre}=req.body;
          const {url}=req.body;
          const {estado}=req.body;
     
          const data= await createMenuQuery(nombre,url,estado);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
     }
     //elimina de manera logica un menu
     async deleteMenu (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const data= await deleteMenuQuery(id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
    }
    //habilitar  un rol
    async habilitarMenu (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const data= await habilitarMenuQuery(id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
     }
 }
 