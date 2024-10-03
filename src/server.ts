
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import { UserRouter } from "./user/user.router";
import { RolRouter } from "./roles/rol.router";
import { ComunidadRouter } from "./comunidades/comunidad.router";
import { ActividadRouter } from "./actividades/actividad.router";
import { GastronomiaRouter } from "./gastronomias/gastronomia.router";
import { MenuRouter } from "./menus/menu.router";
import { AtractivoRouter } from "./atractivos_turisticos/atractivo.router";
import { RestauranteRouter } from "./restaurantes/restaurante.router";
import { HotelRouter } from "./hoteles/hotel.router";
import { ImagenRouter } from "./imagenes/imagen.router";


class ServerBootstrap {
    
    public app: express.Application = express();
    private port: number = 3000;

    constructor() {
      
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use("/public", express.static(path.join(__dirname, "../public")));
        this.app.use(morgan("dev"));
        //this.app.use(cors);
          this.app.use(
          cors({
            origin: true,
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
            credentials: true,
          })
        );
      this.app.use("/api", this.routers());
      this.listen();
    }
    routers():Array<express.Router>{
      return [new UserRouter().router,
              new RolRouter().router,
              new ComunidadRouter().router,
              new ActividadRouter().router,
              new GastronomiaRouter().router,
              new MenuRouter().router,
              new AtractivoRouter().router,
              new RestauranteRouter().router,
              new HotelRouter().router,
              new ImagenRouter().router
            ];
    }
    public listen() {
        this.app.listen(this.port, () => {
          console.log(
            `Servidor iniciado en el puerto ${this.port}`
          );
        });
    }

}
new ServerBootstrap();