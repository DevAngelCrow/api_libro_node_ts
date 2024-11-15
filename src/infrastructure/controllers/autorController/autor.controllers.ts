import { ServiceContainer } from "../../../shared/infraestructure/ServiceContainer";
import { Request, Response } from "express";

export class AutorController {
  async createAutor(request: Request, response: Response) {
    const {
      nombres,
      apellidos,
      fecha_nacimiento,
      id_nacionalidad,
      telefono,
      email,
      estado,
    } = request.body;

    const fecha = new Date(fecha_nacimiento);
    await ServiceContainer.autor.create
      .run(
        nombres,
        apellidos,
        fecha,
        id_nacionalidad,
        telefono,
        email,
        estado
      )
      .then(() =>
        response.status(201).send({ message: "Autor creado exitosamente" })
      )
      .catch((error) => {
        response.status(error.statusCode).json({ message: error.message });
      });
  }
}
