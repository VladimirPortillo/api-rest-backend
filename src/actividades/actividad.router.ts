import { ActividadController } from "./actividad.controllers/actividad.controller";
import { BaseRouter } from "../shared/router/router";
import { upload, uploadEdit } from "../middlewares/uploadFiles.middleware";

export class ActividadRouter extends BaseRouter<ActividadController>{
    
    constructor(){
        super(ActividadController);
    }

    routes():void{
        this.router.get('/actividades', (req, res)=> this.controller.getActividades(req, res));
        this.router.get('/verActividad/:id',(req,res)=>this.controller.verActividad(req,res));
        //this.router.put('/updateActividad/:id',(req,res)=>this.controller.updateActividad(req,res));
        this.router.put('/updateActividad/:id',uploadEdit,(req,res)=>this.controller.updateActividad(req,res));
        //this.router.post('/createActividad',(req,res)=>this.controller.createActividad(req,res));
        this.router.post('/createActividad', upload,(req,res)=>this.controller.createActividad(req,res));
        this.router.delete('/deleteActividad/:id',(req,res)=>this.controller.deleteActividad(req,res));
        this.router.get('/habilitarActividad/:id',(req,res)=>this.controller.habilitarActividad(req,res));
    }
}