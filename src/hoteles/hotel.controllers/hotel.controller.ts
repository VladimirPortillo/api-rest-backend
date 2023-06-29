import  { Request , Response} from "express";
import {  createHotelQuery, deleteHotelQuery, getHotelesQuery,habilitarHotelQuery,updateHotelQuery, verHotelQuery} from "../hotel.services/hotel.service"; 

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
          const {nombre}=req.body;
          const {descripcion}=req.body;
          const {direccion}=req.body;
          const {tipo}=req.body;
          const {categoria}=req.body;
          const {num_habitaciones}=req.body;
          const {telefono}=req.body;
          const {foto}=req.body;
          const {longitud}=req.body;
          const {latitud}=req.body;
          const {estado}=req.body;
          const {id_comunidad}=req.body;
          const data= await updateHotelQuery(nombre,descripcion,direccion,tipo,categoria,num_habitaciones,telefono,foto,longitud,latitud,estado,id_comunidad,id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
    }
    //crea un nuevo rol
    async createHotel (req:Request, res:Response){   
          
          const {nombre}=req.body;
          const {descripcion}=req.body;
          const {direccion}=req.body;
          const {tipo}=req.body;
          const {categoria}=req.body;
          const {num_habitaciones}=req.body;
          const {telefono}=req.body;
          const {foto}=req.body;
          const {longitud}=req.body;
          const {latitud}=req.body;
          const {estado}=req.body;
          const {id_comunidad}=req.body;
     
          const data= await createHotelQuery(nombre,descripcion,direccion,tipo,categoria,num_habitaciones,telefono,foto,longitud,latitud,estado,id_comunidad);
          
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
 