import { RestauranteController } from "./restaurante.controllers/restaurante.controller";
import { BaseRouter } from "../shared/router/router";
import { upload, uploadEdit } from "../middlewares/uploadFiles.middleware";

export class RestauranteRouter extends BaseRouter<RestauranteController>{
    
    constructor(){
        super(RestauranteController);
    }

    routes():void{
        this.router.get('/restaurantes', (req, res)=> this.controller.getRestaurantes(req, res));
        this.router.get('/verRestaurante/:id',(req,res)=>this.controller.verRestaurante(req,res));
        //this.router.put('/updateRestaurante/:id',(req,res)=>this.controller.updateRestaurante(req,res));
        this.router.put('/updateRestaurante/:id',uploadEdit,(req,res)=>this.controller.updateRestaurante(req,res));
        //this.router.post('/createRestaurante',(req,res)=>this.controller.createRestaurante(req,res));
        this.router.post('/createRestaurante', upload,(req,res)=>this.controller.createRestaurante(req,res));
        this.router.delete('/deleteRestaurante/:id',(req,res)=>this.controller.deleteRestaurante(req,res));
        this.router.get('/habilitarRestaurante/:id',(req,res)=>this.controller.habilitarRestaurante(req,res));
    }
}