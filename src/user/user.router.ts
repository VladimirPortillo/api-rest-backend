import { UserController } from "./controllers/user.controller";
import { BaseRouter } from "../shared/router/router";

export class UserRouter extends BaseRouter<UserController>{
    
    constructor(){
        super(UserController);
    }
    
    routes():void{
        this.router.post('/login', (req, res)=> this.controller.loginUsuario(req, res));
        this.router.get('/usuarios', (req, res)=> this.controller.getUsuarios(req, res));
        this.router.get('/verUsuario/:id',(req,res)=>this.controller.verUsuario(req,res));
        this.router.put('/updateUsuario/:id',(req,res)=>this.controller.updateUsuario(req,res));
        this.router.post('/createUsuario',(req,res)=>this.controller.createUsuario(req,res));
        this.router.delete('/deleteUsuario/:id',(req,res)=>this.controller.deleteUsuario(req,res));
        this.router.get('/habilitarUsuario/:id',(req,res)=>this.controller.habilitarUsuario(req,res));

        this.router.post('/encriptarContrasenia', (req, res)=> this.controller.encriptarContrasenia(req, res));
    }
}
