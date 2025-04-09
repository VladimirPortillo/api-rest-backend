import { Request, Response } from "express";
import {
     getGastronomiasQuery,
     updateGastronomiaQuery,
     createGastronomiaQuery,
     deleteGastronomiaQuery,
     habilitarGastronomiaQuery,
     verGastronomiaQuery,
     crearComunidadesGastronomia,
     eliminarComunidadesGastronomia
} from "../gastronomia.services/gastronomia.service";
import { createMultimediaQuery, deleteMultimediaQuery } from "../../multimedias/multimedia.services/multimedia.service";

export class GastronomiaController {
     //lista todos los roles 
     async getGastronomias(req: Request, res: Response) {

          try {
               const data = await getGastronomiasQuery();
               res.status(200).json(data);
          } catch (e) {
               console.log(e)
          }
     }
     //actualiza un nuevo rol
     async verGastronomia(req: Request, res: Response) {
          const id = parseInt(req.params.id);
          console.log('entro 1');
          const data = await verGastronomiaQuery(id);

          if (!data.ok) {
               res.status(500).json(data);
          }
          res.status(200).json(data);
     }
     //actualiza un nuevo rol
     async updateGastronomia(req: Request, res: Response) {
          console.log('body:',req.body);
          const id_gastronomia = parseInt(req.params.id);
          const data = JSON.parse(req.body.data); 
          //const ids_comunidad = JSON.parse(req.body.ids_comunidad || []); 
          //const delete_ids_comunidad = JSON.parse(req.body.delete_ids_comunidad || []); 
          // console.log('data:',data);
                  
          const {filesName}=req.body;
          const deleteMultimedias = data.multimedias.filter((m: { eliminar: boolean; }) => m.eliminar === true);
          
          const updateGastronomia = await updateGastronomiaQuery(data.nombre, data.descripcion, data.tipo, data.estado, id_gastronomia);

          let resp = updateGastronomia;

          if(!updateGastronomia.ok) {
               res.status(500).json(updateGastronomia);
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
               const respCreateMultimedia = await createMultimediaQuery(id_gastronomia, filesName, 3, 'gastronomias');
               // console.log('insert rutas en multimedia', respCreateMultimedia);  
               resp.createMultimedia = respCreateMultimedia;
          }

          if(data.ids_comunidad.length > 0 && data.ids_comunidad !== undefined) {
               const respComunidadesGastronomia = await crearComunidadesGastronomia(id_gastronomia, data.ids_comunidad);
               resp.createComunidadesGastronomia = respComunidadesGastronomia;
          }

          if(data.delete_ids_comunidad.length > 0 && data.delete_ids_comunidad !== undefined) {
               const respDeleteComunidadesGastronomia = await eliminarComunidadesGastronomia(id_gastronomia, data.delete_ids_comunidad);
               resp.deleteComunidadesGastronomia = respDeleteComunidadesGastronomia;
          }
          
          return res.status(200).json(resp);
     }
     //crea un nuevo rol
     async createGastronomia(req: Request, res: Response) {

          console.log(req.body);

          const { nombre } = req.body;
          const { descripcion } = req.body;
          const { tipo } = req.body;
          const { estado } = req.body;
          const ids_comunidad = JSON.parse(req.body.ids_comunidad);

          const { filesName } = req.body;


          let data = await createGastronomiaQuery(nombre, descripcion, tipo, estado);

          const id_gastronomia = data.data.rows[0].id_gastronomia;

          const respComunidadesGastronomia = await crearComunidadesGastronomia(id_gastronomia, ids_comunidad);

          data.comunidades_gastronomia = respComunidadesGastronomia;

          const respMultimedia = await createMultimediaQuery(id_gastronomia, filesName, 3, 'gastronomias');

          data.multimedias = respMultimedia;

          if (!data.ok) {
               res.status(500).json(data);
          }
          res.status(200).json(data);
     }
     //elimina de manera logica un rol
     async deleteGastronomia(req: Request, res: Response) {
          const id = parseInt(req.params.id);
          const data = await deleteGastronomiaQuery(id);

          if (!data.ok) {
               res.status(500).json(data);
          }
          res.status(200).json(data);
     }
     //habilitar  un rol
     async habilitarGastronomia(req: Request, res: Response) {
          const id = parseInt(req.params.id);
          const data = await habilitarGastronomiaQuery(id);

          if (!data.ok) {
               res.status(500).json(data);
          }
          res.status(200).json(data);
     }
}
