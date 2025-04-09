import multer, { FileFilterCallback } from "multer";
import path from "path";
import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../public/uploads"),
    filename: function (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
    ) {

        console.log(file);        

        if (!req.body.filesName) {
            req.body.filesName = [];
        }
        
        const uuid = crypto.randomUUID();
        const fileName = uuid + file.originalname.substring(file.originalname.lastIndexOf("."));
        // req.body.filesName = fileName; // para single
        req.body.filesName.push({fileName: fileName, mimetype: file.mimetype});
        cb(null, fileName);
    },
});

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    const fileTypes = ["image/png", "image/jpg", "image/jpeg"];

    if (fileTypes.some((fileType) => fileType === file.mimetype)) {
        return cb(null, true);
    }

    return cb(null, false);
};

const maxSize = 5 * 1600 * 1300;

export const upload = (req: Request, res: Response, next: NextFunction) => {
    return multer({
      storage,
      limits: { fileSize: maxSize },
      fileFilter,
    }).array("image", 5)(req, res, (err) => {
      //.single("image")(req, res, (err) => {
      // File size error
      console.log('error', err);      

      if (err instanceof multer.MulterError) {        
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
            msg: "¡Se permite un máximo de 5 archivos!",
            });
        }

        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            msg: "¡Se permite un tamaño máximo de archivo de 5 MB!",
          });
        } 
        return res.status(400).json({
            msg: "¡Mensaje no personalizado! "+err.code,
        });
      }

      // Invalid file type, message will return from fileFilter callback
      if (err) return res.status(400).json(err.message);

      // File not selected or incorrect format
      if (!req.files || req.files.length === 0  /* !req.file // para single */)
        return res.status(400).json({
          msg: "No se ha subido ningún archivo, recuerda que solo puedes subir formatos .jpeg, .jpg y .png.",
        });

      // Success
      next();
    });
};

export const uploadEdit = (req: Request, res: Response, next: NextFunction) => {
  return multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter,
  }).array("image", 5)(req, res, (err) => {
    //.single("image")(req, res, (err) => {
    // File size error
    console.log('error uploadEdit', err);      

    if (err instanceof multer.MulterError) {        
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).json({
          msg: "¡Se permite un máximo de 5 archivos!",
          });
      }

      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          msg: "¡Se permite un tamaño máximo de archivo de 5 MB!",
        });
      } 
      return res.status(400).json({
          msg: "¡Mensaje no personalizado! "+err.code,
      });
    }

    // Invalid file type, message will return from fileFilter callback
    if (err) return res.status(400).json(err.message);

    // File not selected or incorrect format
    if (!req.files || req.files.length === 0) {
      req.body.filesName = [];
    }

    // Success
    next();
  });
};

