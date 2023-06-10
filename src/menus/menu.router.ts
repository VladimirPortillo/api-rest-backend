import { MenuController } from "./menu.controllers/menu.controller";
import { BaseRouter } from "../shared/router/router";

export class MenuRouter extends BaseRouter<MenuController>{
    
    constructor(){
        super(MenuController);
    }

    routes():void{
        this.router.get('/menus', (req, res)=> this.controller.getMenus(req, res));
        this.router.get('/verMenu/:id',(req,res)=>this.controller.verMenu(req,res));
        this.router.put('/updateMenu/:id',(req,res)=>this.controller.updateMenu(req,res));
        this.router.post('/createMenu',(req,res)=>this.controller.createMenu(req,res));
        this.router.delete('/deleteMenu/:id',(req,res)=>this.controller.deleteMenu(req,res));
        this.router.get('/habilitarMenu/:id',(req,res)=>this.controller.habilitarMenu(req,res));
    }
}