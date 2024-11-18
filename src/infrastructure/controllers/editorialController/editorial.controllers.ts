import { Request, Response } from 'express';
import { ServiceContainer } from "../../../shared/infraestructure/ServiceContainer";

export class EditorialController {
    async create(request: Request, response: Response){
        const { nombre, direccion, anio_fundacion, id_pais, id_tipo_editorial, sitio_web, telefono, estado } = request.body;

        await ServiceContainer.editorial.create.run(nombre, direccion, anio_fundacion, id_pais, id_tipo_editorial, sitio_web, telefono, estado)
    }
}