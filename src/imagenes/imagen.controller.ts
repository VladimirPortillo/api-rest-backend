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