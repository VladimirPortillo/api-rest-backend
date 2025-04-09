import { BaseRouter } from "../shared/router/router";
import { TipoActividadController } from "./tipoActividad.controllers/tipoActividad.controller";

export class tipoActividadRouter extends BaseRouter<TipoActividadController>{
    
    constructor(){
        super(TipoActividadController);
    }
    routes():void{
        this.router.get('/tipoActividades', (req, res)=> this.controller.getTipoActividades(req, res));
        this.router.get('/verTipoActividad/:id',(req,res)=>this.controller.verTipoActividad(req,res));
        this.router.post('/createTipoActividad',(req,res)=>this.controller.createTipoActividad(req,res));
        this.router.put('/updateTipoActividad/:id',(req,res)=>this.controller.updateTipoActividad(req,res));
        this.router.delete('/deleteTipoActividad/:id',(req,res)=>this.controller.deleteTipoActividad(req,res));
        this.router.get('/habilitarTipoActividad/:id',(req,res)=>this.controller.habilitarTipoActividad(req,res));
    }
}