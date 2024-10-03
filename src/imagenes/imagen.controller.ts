// import multer from 'multer';
// import path from 'path';
// // Configurar la carpeta de almacenamiento
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos subidos
//     },
//     filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
//   });
  
//   // Inicializar multer con la configuración de almacenamiento
//   const upload = multer({ storage: storage });
  
//   // Ruta para subir imágenes
//   app.post('/upload', upload.single('image'), (req: Request, res: Response) => {
//     if (!req.file) {
//       return res.status(400).send('No se ha subido ningún archivo');
//     }
//     res.send(`Archivo subido: ${req.file.filename}`);
//   });

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