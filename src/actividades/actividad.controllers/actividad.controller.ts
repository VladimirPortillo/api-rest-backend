import  { Request , Response} from "express";
import {  createActividadQuery, deleteActividadQuery, getActividadesQuery,habilitarActividadQuery,updateActividadQuery} from "../actividad.services/actividad.service"; 

export class ActividadController {    
            //lista todos los roles 
            async getActividades (req:Request, res:Response){   
        
               try {
                    const data= await getActividadesQuery();
                    res.status(200).json(data);
               } catch (e) {
                    console.log(e)
               }    
            }
            //actualiza un nuevo rol
            async updateActividad (req:Request, res:Response){   
                  const id=parseInt(req.params.id);
                  const {nombre}=req.body;
                  const {descripcion}=req.body;
                  const {direccion}=req.body;
                  const {fecha_inicio}=req.body;
                  const {fecha_fin}=req.body;
                  const {longitud}=req.body;
                  const {latitud}=req.body;
                  const {estado}=req.body;
                  const data= await updateActividadQuery(nombre,descripcion,direccion,fecha_inicio,fecha_fin,longitud,latitud,estado,id);
                  
                  if(!data.ok) {
                       res.status(500).json(data);
                  } 
                  res.status(200).json(data);
            }
            //crea un nuevo rol
            async createActividad (req:Request, res:Response){   
                  const {nombre}=req.body;
                  const {descripcion}=req.body;
                  const {direccion}=req.body;
                  const {fecha_inicio}=req.body;
                  const {fecha_fin}=req.body;
                  const {longitud}=req.body;
                  const {latitud}=req.body;
                  const {estado}=req.body;
                  
             
                  const data= await createActividadQuery(nombre,descripcion,direccion,fecha_inicio,fecha_fin,longitud,latitud,estado);
                  
                  if(!data.ok) {
                       res.status(500).json(data);
                  } 
                  res.status(200).json(data);
             }
             //elimina de manera logica un rol
             async deleteActividad (req:Request, res:Response){   
                  const id=parseInt(req.params.id);
                  const data= await deleteActividadQuery(id);
                  
                  if(!data.ok) {
                       res.status(500).json(data);
                  } 
                  res.status(200).json(data);
            }
            //habilitar  un rol
            async habilitarActividad (req:Request, res:Response){   
                  const id=parseInt(req.params.id);
                  const data= await habilitarActividadQuery(id);
                  
                  if(!data.ok) {
                       res.status(500).json(data);
                  } 
                  res.status(200).json(data);
             }
 }
 