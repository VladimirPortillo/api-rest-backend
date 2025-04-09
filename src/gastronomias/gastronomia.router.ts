import { GastronomiaController } from "./gastronomia.controllers/gastronomia.controller";
import { BaseRouter } from "../shared/router/router";
import { upload, uploadEdit } from "../middlewares/uploadFiles.middleware";

export class GastronomiaRouter extends BaseRouter<GastronomiaController>{
    
    constructor(){
        super(GastronomiaController);
    }

    routes():void{
        this.router.get('/gastronomias', (req, res)=> this.controller.getGastronomias(req, res));
        this.router.get('/verGastronomia/:id',(req,res)=>this.controller.verGastronomia(req,res));
        //this.router.put('/updateGastronomia/:id',(req,res)=>this.controller.updateGastronomia(req,res));
        this.router.put('/updateGastronomia/:id', uploadEdit,(req,res)=>this.controller.updateGastronomia(req,res));
        //this.router.post('/createGastronomia',(req,res)=>this.controller.createGastronomia(req,res));
        this.router.post('/createGastronomia', upload,(req,res)=>this.controller.createGastronomia(req,res));
        this.router.delete('/deleteGastronomia/:id',(req,res)=>this.controller.deleteGastronomia(req,res));
        this.router.get('/habilitarGastronomia/:id',(req,res)=>this.controller.habilitarGastronomia(req,res));
    }
}