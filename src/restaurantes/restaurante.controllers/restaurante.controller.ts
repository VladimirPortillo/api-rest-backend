import  { Request , Response} from "express";
import {  createRestauranteQuery, deleteRestauranteQuery, getRestaurantesQuery,habilitarRestauranteQuery,updateRestauranteQuery, verRestauranteQuery} from "../restaurante.services/restaurante.service"; 
import { createMultimediaQuery, deleteMultimediaQuery } from "../../multimedias/multimedia.services/multimedia.service";

export class RestauranteController {    
     //lista todos los roles 
    async getRestaurantes (req:Request, res:Response){   
        
       try {
            const data= await getRestaurantesQuery();
            res.status(200).json(data);
       } catch (e) {
            console.log(e)
       }    
    }
    //ver un nuevo rol
    async verRestaurante (req:Request, res:Response){   
     const id=parseInt(req.params.id);
     const data= await verRestauranteQuery(id);
     
     if(!data.ok) {
          res.status(500).json(data);
     } 
     res.status(200).json(data);
}
    //actualiza un nuevo rol
    async updateRestaurante (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const {filesName}=req.body;
          const data = JSON.parse(req.body.data);
          const deleteMultimedias = data.multimedias.filter((m: { eliminar: boolean; }) => m.eliminar === true);
          
          let updateRestaurante= await updateRestauranteQuery(data.nombre,data.descripcion,data.direccion,data.categoria,data.telefono,data.delivery,data.longitud,data.latitud,data.estado,data.id_comunidad,id);
          let resp = updateRestaurante;

          if(!updateRestaurante.ok) {
               res.status(500).json(updateRestaurante);
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
               const respCreateMultimedia = await createMultimediaQuery(id, filesName, 2, 'restaurantes');
               // console.log('insert rutas en multimedia', respCreateMultimedia);  
               resp.createMultimedia = respCreateMultimedia;
             }
             
             return res.status(200).json(resp);
    }
    //crea un nuevo rol
    async createRestaurante (req:Request, res:Response){ 
     console.log('req.body =>', req.body);
     console.log('entro crear restaurante:');
          const {nombre}=req.body;
          const {descripcion}=req.body;
          const {direccion}=req.body;
          const {categoria}=req.body;
          const {telefono}=req.body;
          const {delivery}=req.body;
          const {longitud}=req.body;
          const {latitud}=req.body;
          const {estado}=req.body;
          const {id_comunidad}=req.body;
          console.log(nombre,descripcion,direccion,categoria,telefono,delivery,longitud,latitud,estado,id_comunidad);
          const {filesName}=req.body;

          const data= await createRestauranteQuery(nombre,descripcion,direccion,categoria,telefono,delivery,longitud,latitud,estado,id_comunidad);
          const id_restaurante = data.data.rows[0].id_restaurante;
          console.log('data => ',id_restaurante);
          const respMultimedia = await createMultimediaQuery(id_restaurante, filesName, 2, 'restuarantes');

          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
     }
     //elimina de manera logica un rol
     async deleteRestaurante (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const data= await deleteRestauranteQuery(id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
    }
    //habilitar  un rol
    async habilitarRestaurante (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const data= await habilitarRestauranteQuery(id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
     }
 }
 