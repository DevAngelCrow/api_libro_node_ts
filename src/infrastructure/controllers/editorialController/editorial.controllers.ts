import { Request, Response } from "express";
import { ServiceContainer } from "../../../shared/infraestructure/ServiceContainer";

export class EditorialController {
  async create(request: Request, response: Response) {
    const {
      nombre,
      direccion,
      anio_fundacion,
      id_pais,
      id_tipo_editorial,
      sitio_web,
      telefono,
      estado,
      libros
    } = request.body;

    await ServiceContainer.editorial.create
      .run(
        nombre,
        direccion,
        anio_fundacion,
        id_pais,
        id_tipo_editorial,
        sitio_web,
        telefono,
        estado,
        libros
      )
      .then(() =>
        response.status(201).json({ message: "Editorial creada exitosamente" })
      )
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }
}
