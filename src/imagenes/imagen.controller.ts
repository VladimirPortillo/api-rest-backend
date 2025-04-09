
import { Request, Response } from "express";

import { upload } from "../middlewares/uploadFiles.middleware"

export class ImagenController {
  
  async subirImagen(req: Request, res: Response) {
    try {
      //const data = await getComunidadesQuery();

      //const subi = upload(req, res);

      console.log('req: ', req.body);      

      res.status(200).json({
        msg: 'subir imagen'
      });
    } catch (e) {
      console.log(e);
    }
  }

}