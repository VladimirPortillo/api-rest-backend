import { ComunidadController } from "./comunidad.controllers/comunidad.controller";
import { BaseRouter } from "../shared/router/router";

export class ComunidadRouter extends BaseRouter<ComunidadController>{
    
    constructor(){
        super(ComunidadController);
    }

    routes():void{
        this.router.get('/comunidades', (req, res)=> this.controller.getComunidades(req, res));
        this.router.get('/verComunidad/:id',(req,res)=>this.controller.verComunidad(req,res));
        this.router.post('/createComunidad/',(req,res)=>this.controller.createComunidad(req,res));
        this.router.put('/updateComunidad/:id',(req,res)=>this.controller.updateComunidad(req,res));
        this.router.delete('/deleteComunidad/:id',(req,res)=>this.controller.deleteComunidad(req,res));
        this.router.get('/HabilitarComunidad/:id',(req,res)=>this.controller.habilitarComunidad(req,res));
    }
}