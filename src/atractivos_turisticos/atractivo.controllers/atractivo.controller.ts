import  { Request , Response} from "express";
import {  createAtractivoQuery, deleteAtractivoQuery, getAtractivosQuery, habilitarAtractivoQuery, updateAtractivoQuery, verAtractivoQuery} from "../atractivo.services/atractivo.service"; 

export class AtractivoController {    
         //lista todos los roles 
         async getAtractivos (req:Request, res:Response){   
        
          try {
               const data= await getAtractivosQuery();
               res.status(200).json(data);
          } catch (e) {
               console.log(e)
          }    
       }
       //ver un atractivo
       async verAtractivo (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const data= await verAtractivoQuery(id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
    }
       //actualiza un nuevo rol
       async updateAtractivo (req:Request, res:Response){   
             const id=parseInt(req.params.id);
             const {nombre}=req.body;
             const {descripcion}=req.body;
             const {direccion}=req.body;
             const {longitud}=req.body;
             const {latitud}=req.body;
             const {estado}=req.body;
             const {id_comunidad}=req.body;
             const data= await updateAtractivoQuery(nombre,descripcion,direccion,longitud,latitud,estado,id_comunidad,id);
             
             if(!data.ok) {
                  res.status(500).json(data);
             } 
             res.status(200).json(data);
       }
       //crea un nuevo rol
       async createAtractivo (req:Request, res:Response){   
            
             const {nombre}=req.body;
             const {descripcion}=req.body;
             const {direccion}=req.body;
             const {longitud}=req.body;
             const {latitud}=req.body;
             const {estado}=req.body;
             const {id_comunidad}=req.body;
        
             const data= await createAtractivoQuery(nombre,descripcion,direccion,longitud,latitud,estado,id_comunidad);
             
             if(!data.ok) {
                  res.status(500).json(data);
             } 
             res.status(200).json(data);
        }
        //elimina de manera logica un rol
        async deleteAtractivo (req:Request, res:Response){   
             const id=parseInt(req.params.id);
             const data= await deleteAtractivoQuery(id);
             
             if(!data.ok) {
                  res.status(500).json(data);
             } 
             res.status(200).json(data);
       }
       //habilitar  un rol
       async habilitarAtractivo (req:Request, res:Response){   
             const id=parseInt(req.params.id);
             const data= await habilitarAtractivoQuery(id);
             
             if(!data.ok) {
                  res.status(500).json(data);
             } 
             res.status(200).json(data);
        }
 }
 