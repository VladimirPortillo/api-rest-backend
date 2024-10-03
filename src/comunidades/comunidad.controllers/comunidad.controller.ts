import  { Request , Response} from "express";
import {  createComunidadQuery, deleteComunidadQuery, getComunidadesQuery,habilitarComunidadQuery,updateComunidadQuery, verComunidadQuery} from "../comunidad.services/comunidad.service"; 

export class ComunidadController {    
  //lista todos los roles 
  async getComunidades (req:Request, res:Response){   
        
     try {
          const data= await getComunidadesQuery();
          res.status(200).json(data);
     } catch (e) {
          console.log(e)
     }    
  }
//ver un nuevo rol
       async verComunidad (req:Request, res:Response){   
          const id=parseInt(req.params.id);
          const data= await verComunidadQuery(id);
          
          if(!data.ok) {
               res.status(500).json(data);
          } 
          res.status(200).json(data);
    }
  //actualiza un nuevo rol
  async updateComunidad (req:Request, res:Response){   
        const id=parseInt(req.params.id);
        const {nombre}=req.body;
        const {descripcion}=req.body;
        const {superficie}=req.body;
        const {poblacion}=req.body;
        const {longitud}=req.body;
        const {latitud}=req.body;
        const {estado}=req.body;
        const {id_usuario}=req.body;
        const data= await updateComunidadQuery(nombre,descripcion,superficie,poblacion,longitud,latitud,estado,id_usuario,id);
        
        if(!data.ok) {
             res.status(500).json(data);
        } 
        res.status(200).json(data);
  }
  //crea una nueva comunidad
  async createComunidad (req:Request, res:Response){  
     console.log('entro agregar comunidad');
        const {nombre}=req.body;
        const {descripcion}=req.body;
        const {superficie}=req.body;
        const {poblacion}=req.body;
        const {longitud}=req.body;
        const {latitud}=req.body;
        const {estado}=req.body;
        const {id_usuario}=req.body;

        console.log('Ruta de las imágenes guardadas ', req.body.filesName);
        //const {filesName}=req.body;
        
        // crea la comunidad en la DB  
        const data= await createComunidadQuery(nombre,descripcion,superficie,poblacion,longitud,latitud,estado,id_usuario);

        // recuperar la comunidad por con where de todos los campos nombre,descripcion,superficie,poblacion,longitud,latitud,estado,id_usuario
        // hacer una función guardar los datos de filesName en la DB
        // const guardarRutaImagen = await guardarRutaImagen(filesName, id_comunidad)
        
        if(!data.ok) {
             res.status(500).json(data);
        } 
        res.status(200).json(data);
   }
   //elimina de manera logica un rol
   async deleteComunidad (req:Request, res:Response){   
        const id=parseInt(req.params.id);
        const data= await deleteComunidadQuery(id);
        
        if(!data.ok) {
             res.status(500).json(data);
        } 
        res.status(200).json(data);
  }
  //habilitar  un rol
  async habilitarComunidad (req:Request, res:Response){   
        const id=parseInt(req.params.id);
        const data= await habilitarComunidadQuery(id);
        
        if(!data.ok) {
             res.status(500).json(data);
        } 
        res.status(200).json(data);
   }
 }
 