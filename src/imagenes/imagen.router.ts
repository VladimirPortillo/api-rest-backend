import { ImagenController } from "./imagen.controller";
import { BaseRouter } from "../shared/router/router";
import { upload } from "../middlewares/uploadFiles.middleware";

export class ImagenRouter extends BaseRouter<ImagenController> {
  constructor() {
    super(ImagenController);
  }

  routes(): void {
    this.router.post("/subirImagen", upload, (req, res) =>
      this.controller.subirImagen(req, res)
    );
  }
}
