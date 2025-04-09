import  { Request , Response} from "express";
import {  createComunidadQuery, deleteComunidadQuery, getComunidadesQuery,habilitarComunidadQuery,updateComunidadQuery, verComunidadQuery} from "../comunidad.services/comunidad.service"; 
import { createMultimediaQuery, deleteMultimediaQuery } from "../../multimedias/multimedia.services/multimedia.service";

export class ComunidadController {    
     //lista todas las comunidades
     async getComunidades (req:Request, res:Response){   
        
     try {
          const data= await getComunidadesQuery();
          res.status(200).json(data);
     } catch (e) {
          console.log(e)
     }    
     }
     //ver una comunidad
       async verComunidad (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const data= await verComunidadQuery(id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
     }
     //actualiza una comunidad
     async updateComunidad (req:Request, res:Response){   
        const id=parseInt(req.params.id);
        console.log('id_comunidad', id);
        console.log('req.body', req.body);
        const data = JSON.parse(req.body.data); // data contine toda la info de comunidad
        //console.log('data', data);

        const {filesName}=req.body;

        const deleteMultimedias = data.multimedias.filter((m: { eliminar: boolean; }) => m.eliminar === true);
        //console.log('deleteMultimedias', deleteMultimedias);
        
        let updateComunidad= await updateComunidadQuery(data.nombre,data.descripcion,data.superficie,data.poblacion,data.longitud,data.latitud,data.estado,data.id_usuario,id);
        
        let resp = updateComunidad;

        if(!updateComunidad.ok) {
          res.status(500).json(updateComunidad);
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
          const respCreateMultimedia = await createMultimediaQuery(id, filesName, 1, 'comunidades');
          // console.log('insert rutas en multimedia', respCreateMultimedia);  
          resp.createMultimedia = respCreateMultimedia;
        }
        
        return res.status(200).json(resp);

     }
     //crea una nueva comunidad
     async createComunidad (req:Request, res:Response){  
        const {nombre}=req.body;
        const {descripcion}=req.body;
        const {superficie}=req.body;
        const {poblacion}=req.body;
        const {longitud}=req.body;
        const {latitud}=req.body;
        const {estado}=req.body;
        const {id_usuario}=req.body;
        
        const {filesName}=req.body;
        console.log('Array imagenes', filesName);        
        
        // crea la comunidad en la DB  
        const data= await createComunidadQuery(nombre,descripcion,superficie,poblacion,longitud,latitud,estado,id_usuario);
        console.log('resp insert comunidad', data);
        const id_comunidad = data.data.rows[0].id_comunidad;
        console.log('Insert id_omunidad', id_comunidad);        

        const respMultimedia = await createMultimediaQuery(id_comunidad, filesName, 1, 'comunidades');

        console.log('insert rutas en multimedia', respMultimedia);        
        
        if(!data.ok) {
             res.status(500).json(data);
        } 
        res.status(200).json(data);
     }
     //elimina de manera logica una comunidad
     async deleteComunidad (req:Request, res:Response){   
        const id=parseInt(req.params.id);
        const data= await deleteComunidadQuery(id);
        
        if(!data.ok) {
             res.status(500).json(data);
        } 
        res.status(200).json(data);
     }
     //habilitar  una comunidad
     async habilitarComunidad (req:Request, res:Response){   
        const id=parseInt(req.params.id);
        const data= await habilitarComunidadQuery(id);
        
        if(!data.ok) {
             res.status(500).json(data);
        } 
        res.status(200).json(data);
     }
 }
 