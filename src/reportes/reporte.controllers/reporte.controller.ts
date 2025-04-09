import { Request, Response } from "express";
import { verComunidadActividadesQuery } from "../reporte.services/reporte.service";
import { ComunidadQuery } from "../../comunidades/comunidad.services/comunidad.service";
export class ReporteController {
    async getComunidadActividades(req: Request, res: Response) {
        const {id_comunidad} = req.query;
        const {fecha_inic}=req.query;
        const {fecha_fin}=req.query;
        console.log(id_comunidad,fecha_inic,fecha_fin);
        
        const respComunidad=await ComunidadQuery(Number(id_comunidad));

        const comunidad = respComunidad.data.rows[0];
        //console.log(comunidad);

        const actividades = await verComunidadActividadesQuery(Number(id_comunidad),String(fecha_inic),String(fecha_fin));
        //console.log(actividades);        
        comunidad.actividades = actividades.data;

        // // comunidad.actividades = actividades.data

        //  if (!comunidad.ok) {
        //     res.status(500).json(comunidad);
        // }
         res.status(200).json(comunidad);
    }
}