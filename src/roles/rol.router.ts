import { RolController } from "./rol.controllers/rol.controller";
import { BaseRouter } from "../shared/router/router";

export class RolRouter extends BaseRouter<RolController>{
    
    constructor(){
        super(RolController);
    }

    routes():void{
        this.router.get('/roles', (req, res)=> this.controller.getRoles(req, res));
        this.router.put('/updateRol/:id',(req,res)=>this.controller.updateRol(req,res));
        this.router.get('/verRol/:id',(req,res)=>this.controller.verRol(req,res));
        this.router.post('/createRol',(req,res)=>this.controller.createRol(req,res));
        this.router.delete('/deleteRol/:id',(req,res)=>this.controller.deleteRol(req,res));
        this.router.get('/habilitarRol/:id',(req,res)=>this.controller.habilitarRol(req,res));
    }
}