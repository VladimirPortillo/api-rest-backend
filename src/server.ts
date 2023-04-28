import express from "express";
import morgan from "morgan";
import cors from "cors";

class ServerBootstrap {
    
    public app: express.Application = express();
    private port: number = 3000;

    constructor() {
        //super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        //this.passportUse();
        //this.dbConnect();
        this.app.use(morgan("dev"));

        this.app.use(
          cors({
            origin: true,
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
            credentials: true,
          })
        );

        //this.app.use("/api", this.routers());
        this.listen();
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