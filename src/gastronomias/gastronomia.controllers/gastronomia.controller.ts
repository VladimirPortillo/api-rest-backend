import  { Request , Response} from "express";
import {  getGastronomiasQuery,updateGastronomiaQuery,createGastronomiaQuery,deleteGastronomiaQuery,habilitarGastronomiaQuery, verGastronomiaQuery} from "../gastronomia.services/gastronomia.service"; 

export class GastronomiaController {    
     //lista todos los roles 
     async getGastronomias (req:Request, res:Response){   
        
          try {
               const data= await getGastronomiasQuery();
               res.status(200).json(data);
          } catch (e) {
               console.log(e)
          }    
       }
         //actualiza un nuevo rol
         async verGastronomia (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          console.log('entro 1');
          const data= await verGastronomiaQuery(id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
    }
       //actualiza un nuevo rol
       async updateGastronomia (req:Request, res:Response){   
             const id=parseInt(req.params.id);
             const {nombre}=req.body;
             const {descripcion}=req.body;
             const {tipo}=req.body;
             const {estado}=req.body;
             const {id_comunidad}=req.body;
             const data= await updateGastronomiaQuery(nombre,descripcion,tipo,estado,id_comunidad,id);
             
             if(!data.ok) {
                  res.status(500).json(data);
             } 
             res.status(200).json(data);
       }
       //crea un nuevo rol
       async createGastronomia (req:Request, res:Response){   
             const {nombre}=req.body;
             const {descripcion}=req.body;
             const {tipo}=req.body;
             const {estado}=req.body;
            
        
             const data= await createGastronomiaQuery(nombre,descripcion,tipo,estado);
             
             if(!data.ok) {
                  res.status(500).json(data);
             } 
             res.status(200).json(data);
        }
        //elimina de manera logica un rol
        async deleteGastronomia (req:Request, res:Response){   
             const id=parseInt(req.params.id);
             const data= await deleteGastronomiaQuery(id);
             
             if(!data.ok) {
                  res.status(500).json(data);
             } 
             res.status(200).json(data);
       }
       //habilitar  un rol
       async habilitarGastronomia (req:Request, res:Response){   
             const id=parseInt(req.params.id);
             const data= await habilitarGastronomiaQuery(id);
             
             if(!data.ok) {
                  res.status(500).json(data);
             } 
             res.status(200).json(data);
        }
 }
 