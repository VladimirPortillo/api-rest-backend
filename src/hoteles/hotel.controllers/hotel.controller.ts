import  { Request , Response} from "express";
import {  createHotelQuery, deleteHotelQuery, getHotelesQuery,habilitarHotelQuery,updateHotelQuery, verHotelQuery} from "../hotel.services/hotel.service"; 
import { createMultimediaQuery, deleteMultimediaQuery } from "../../multimedias/multimedia.services/multimedia.service";

export class HotelController {    
     //lista todos los roles 
    async getHoteles (req:Request, res:Response){   
        
       try {
            const data= await getHotelesQuery();
            res.status(200).json(data);
       } catch (e) {
            console.log(e)
       }    
    }
    //ver un hotel
    async verHotel (req:Request, res:Response){   
     const id=parseInt(req.params.id);
     const data= await verHotelQuery(id);
     
     if(!data.ok) {
          res.status(500).json(data);
     } 
     res.status(200).json(data);
}
    //actualiza un nuevo rol
    async updateHotel (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const data = JSON.parse(req.body.data); // data contine toda la info de comunidad
        console.log('data', data);

          const {filesName}=req.body;

          const deleteMultimedias = data.multimedias.filter((m: { eliminar: boolean; }) => m.eliminar === true);
          const updateHotel= await updateHotelQuery(data.nombre,data.descripcion,data.direccion,data.estrellas,data.telefono,data.garaje,data.alimentacion,data.aire_acondicionado,data.longitud,data.latitud,data.estado,data.id_comunidad,id);
          
          let resp = updateHotel;
          console.log('resp:',resp);
          

        if(!updateHotel.ok) {
          res.status(500).json(updateHotel);
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
          const respCreateMultimedia = await createMultimediaQuery(id, filesName, 5, 'hoteles');
          // console.log('insert rutas en multimedia', respCreateMultimedia);  
          resp.createMultimedia = respCreateMultimedia;
        }
        
        return res.status(200).json(resp);
    }
    //crea un nuevo rol
    async createHotel (req:Request, res:Response){   
          
          const {nombre}=req.body;
          const {descripcion}=req.body;
          const {direccion}=req.body;
          const {estrellas}=req.body;
          const {telefono}=req.body;
          const {garaje}=req.body;
          const {alimentacion}=req.body;
          const {aire_acondicionado}=req.body;
          const {longitud}=req.body;
          const {latitud}=req.body;
          const {estado}=req.body;
          const {id_comunidad}=req.body;

          const {filesName}=req.body;
     
          const data= await createHotelQuery(nombre,descripcion,direccion,estrellas,telefono,garaje,alimentacion,aire_acondicionado,longitud,latitud,estado,id_comunidad);
          
          const id_hotel = data.data.rows[0].id_hotel;

          const respMultimedia = await createMultimediaQuery(id_hotel, filesName, 5, 'hoteles');

          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
     }
     //elimina de manera logica un rol
     async deleteHotel (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const data= await deleteHotelQuery(id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
    }
    //habilitar  un rol
    async habilitarHotel (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const data= await habilitarHotelQuery(id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
     }
 }
 