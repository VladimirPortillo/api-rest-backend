import  { Request , Response} from "express";
import { createTipoActividadQuery, deleteTipoActividadQuery, getTipoActividadesQuery, habilitarTipoActividadQuery, updateTipoActividadQuery, verTipoActividadQuery } from "../tipoActividad.service/tipoActividad.service";
export class TipoActividadController {  
     //listar todos los tipos actividades
    async getTipoActividades (req:Request, res:Response){   
        
        try {
             const data= await getTipoActividadesQuery();
             res.status(200).json(data);
        } catch (e) {
             console.log(e)
        }    
     } 
     //ver un tipo actividad 
     async verTipoActividad (req:Request, res:Response){   
               const id_tipo=parseInt(req.params.id);
               const data= await verTipoActividadQuery(id_tipo);
               
               if(!data.ok) {
                    res.status(500).json(data);
               } 
               res.status(200).json(data);
     }
     //crea tipo actividad
    async createTipoActividad (req:Request, res:Response){   
          
          const {nombre}=req.body;
          const {descripcion}=req.body;
          const {estado}=req.body;

          const data= await createTipoActividadQuery(nombre,descripcion,estado);
     
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
     }
     //actualiza un tipo actividad
    async updateTipoActividad (req:Request, res:Response){   
          const id_tipo=parseInt(req.params.id);
          const {nombre}=req.body;
          const {descripcion}=req.body;
          const {estado}=req.body;
          const data= await updateTipoActividadQuery(nombre,descripcion,estado,id_tipo);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
     }  
       //elimina de manera logica un tipo actividad
       async deleteTipoActividad (req:Request, res:Response){   
          const id_tipo=parseInt(req.params.id);
          const data= await deleteTipoActividadQuery(id_tipo);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
    }
    //habilitar  un tipo actividad
    async habilitarTipoActividad (req:Request, res:Response){   
     const id_tipo=parseInt(req.params.id);
     const data= await habilitarTipoActividadQuery(id_tipo);
     
     if(!data.ok) {
          res.status(500).json(data);
     } 
     res.status(200).json(data);
}
}