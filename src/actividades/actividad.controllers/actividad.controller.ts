import  { Request , Response} from "express";
import {  createActividadQuery, deleteActividadQuery, getActividadesQuery,habilitarActividadQuery,updateActividadQuery, verActividadQuery} from "../actividad.services/actividad.service"; 
import { createMultimediaQuery, deleteMultimediaQuery } from "../../multimedias/multimedia.services/multimedia.service";

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
               //ver un atractivo
       async verActividad (req:Request, res:Response){   
          const id_actividad=parseInt(req.params.id);
          const data= await verActividadQuery(id_actividad);
          console.log('datos base actividad',data);
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
    }
            //actualiza un nuevo rol
            async updateActividad (req:Request, res:Response){   
                  const id_actividad=parseInt(req.params.id);
                  const data = JSON.parse(req.body.data); 
                  console.log('data:',data);
                  
                  const {filesName}=req.body;
                  console.log('files',filesName);
                  
                  const deleteMultimedias = data.multimedias.filter((m: { eliminar: boolean; }) => m.eliminar === true);
                  //console.log(nombre,descripcion,direccion,fecha_inicio,fecha_fin,longitud,latitud,estado,id_comunidad,id_tipo);
                  const updateActividad= await updateActividadQuery(data.nombre,data.descripcion,data.direccion,data.fecha_inicio,data.fecha_fin,data.longitud,data.latitud,data.estado,data.id_comunidad,data.id_tipo,id_actividad);
                  
                  let resp = updateActividad;

                  if(!updateActividad.ok) {
                    res.status(500).json(updateActividad);
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
                    const respCreateMultimedia = await createMultimediaQuery(id_actividad, filesName, 6, 'actividades');
                    // console.log('insert rutas en multimedia', respCreateMultimedia);  
                    resp.createMultimedia = respCreateMultimedia;
                  }
                  
                  return res.status(200).json(resp);
          
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
                  const {id_comunidad}=req.body;
                  const {id_tipo}=req.body;
                  
                  console.log('actividad', req.body);
                  const {filesName}=req.body;
                  console.log('archivos'+filesName);
                  
             
                  const data= await createActividadQuery(nombre,descripcion,direccion,fecha_inicio,fecha_fin,longitud,latitud,estado,id_comunidad,id_tipo);
                  
                  console.log('create activdades', data);                  

                  const id_actividad = data.data.rows[0].id_actividad;

                 const respMultimedia = await createMultimediaQuery(id_actividad, filesName, 6, 'actividades');

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
 