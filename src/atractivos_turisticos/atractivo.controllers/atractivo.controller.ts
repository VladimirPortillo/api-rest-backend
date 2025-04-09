import  { Request , Response} from "express";
import {  createAtractivoQuery, deleteAtractivoQuery, getAtractivosQuery, habilitarAtractivoQuery, updateAtractivoQuery, verAtractivoQuery} from "../atractivo.services/atractivo.service"; 
import { createMultimediaQuery, deleteMultimediaQuery } from "../../multimedias/multimedia.services/multimedia.service";

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
             
          const data = JSON.parse(req.body.data); 
          const {filesName}=req.body;

          const deleteMultimedias = data.multimedias.filter((m: { eliminar: boolean; }) => m.eliminar === true);
          let updateAtractivo= await updateAtractivoQuery(data.nombre,data.descripcion,data.direccion,data.longitud,data.latitud,data.estado,data.id_comunidad,id);
          let resp=updateAtractivo;
             
          if(!updateAtractivo.ok) {
               res.status(500).json(updateAtractivo);
               return;
             }
             if(deleteMultimedias.length > 0) {
               // elimina los multimedia que elimino el usuario de la DB y el archivo 
               const respDeleteMultimedia = await deleteMultimediaQuery(deleteMultimedias); 
               // console.log('respDeleteMultimedia', respDeleteMultimedia);
               resp.deleteMultimedia = respDeleteMultimedia;
             }
     
             if(filesName.length > 0) {
               // agrega nuevos archivos si existe
               const respCreateMultimedia = await createMultimediaQuery(id, filesName, 4, 'atractivos_turisticos');
               // console.log('insert rutas en multimedia', respCreateMultimedia);  
               resp.createMultimedia = respCreateMultimedia;
             }
             
             return res.status(200).json(resp);
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

             const {filesName}=req.body;

             console.log('archivo'+filesName);
             
        
             const data= await createAtractivoQuery(nombre,descripcion,direccion,longitud,latitud,estado,id_comunidad);
             
             const id_atractivo = data.data.rows[0].id_comunidad;

             const respMultimedia = await createMultimediaQuery(id_atractivo, filesName, 4, 'atractivos_turisticos');

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
 