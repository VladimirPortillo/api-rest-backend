import { HotelController } from "./hotel.controllers/hotel.controller";
import { BaseRouter } from "../shared/router/router";
import { upload, uploadEdit } from "../middlewares/uploadFiles.middleware";

export class HotelRouter extends BaseRouter<HotelController>{
    
    constructor(){
        super(HotelController);
    }

    routes():void{
        this.router.get('/hoteles', (req, res)=> this.controller.getHoteles(req, res));
        this.router.get('/verHotel/:id',(req,res)=>this.controller.verHotel(req,res));
        //this.router.put('/updateHotel/:id',(req,res)=>this.controller.updateHotel(req,res));
        this.router.put('/updateHotel/:id', uploadEdit,(req,res)=>this.controller.updateHotel(req,res));
        //this.router.post('/createHotel',(req,res)=>this.controller.createHotel(req,res));
        this.router.post('/createHotel', upload,(req,res)=>this.controller.createHotel(req,res));
        this.router.delete('/deleteHotel/:id',(req,res)=>this.controller.deleteHotel(req,res));
        this.router.get('/habilitarHotel/:id',(req,res)=>this.controller.habilitarHotel(req,res));
    }
}