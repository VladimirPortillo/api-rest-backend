import { AtractivoController } from "./atractivo.controllers/atractivo.controller";
import { BaseRouter } from "../shared/router/router";

export class AtractivoRouter extends BaseRouter<AtractivoController>{
    
    constructor(){
        super(AtractivoController);
    }

    routes():void{
        
        this.router.get('/atractivos', (req, res)=> this.controller.getAtractivos(req, res));
        this.router.get('/verAtractivo/:id',(req,res)=>this.controller.verAtractivo(req,res));
        this.router.put('/updateAtractivo/:id',(req,res)=>this.controller.updateAtractivo(req,res));
        this.router.post('/createAtractivo',(req,res)=>this.controller.createAtractivo(req,res));
        this.router.delete('/deleteAtractivo/:id',(req,res)=>this.controller.deleteAtractivo(req,res));
        this.router.get('/habilitarAtractivo/:id',(req,res)=>this.controller.habilitarAtractivo(req,res));
    }
}