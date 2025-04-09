
import { BaseRouter } from "../shared/router/router";
import { ReporteController } from "./reporte.controllers/reporte.controller";

export class ReporteRouter extends BaseRouter<ReporteController>{
    
    constructor(){
        super(ReporteController);
    }

    routes():void{
        this.router.get('/comunidadActividades', (req, res)=> this.controller.getComunidadActividades(req, res));
        
    }
}