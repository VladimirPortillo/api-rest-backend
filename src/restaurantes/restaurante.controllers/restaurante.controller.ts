import  { Request , Response} from "express";
import {  createRestauranteQuery, deleteRestauranteQuery, getRestaurantesQuery,habilitarRestauranteQuery,updateRestauranteQuery, verRestauranteQuery} from "../restaurante.services/restaurante.service"; 

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
          const {nombre}=req.body;
          const {descripcion}=req.body;
          const {direccion}=req.body;
          const {categoria}=req.body;
          const {telefono}=req.body;
          const {foto}=req.body;
          const {longitud}=req.body;
          const {latitud}=req.body;
          const {estado}=req.body;
          const {id_comunidad}=req.body;
          const data= await updateRestauranteQuery(nombre,descripcion,direccion,categoria,telefono,foto,longitud,latitud,estado,id_comunidad,id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
    }
    //crea un nuevo rol
    async createRestaurante (req:Request, res:Response){   
          
          const {nombre}=req.body;
          const {descripcion}=req.body;
          const {direccion}=req.body;
          const {categoria}=req.body;
          const {telefono}=req.body;
          const {foto}=req.body;
          const {longitud}=req.body;
          const {latitud}=req.body;
          const {estado}=req.body;
          const {id_comunidad}=req.body;
     
          const data= await createRestauranteQuery(nombre,descripcion,direccion,categoria,telefono,foto,longitud,latitud,estado,id_comunidad);
          
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
 