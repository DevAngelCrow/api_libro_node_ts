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
      libros,
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

  async getOneById(request: Request, response: Response) {
    const { id } = request.params;

    await ServiceContainer.editorial.getOneById
      .run(+id)
      .then((res) => response.status(200).json(res.mapToPrimitives()))
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }

  async getAll(request: Request, response: Response) {
    await ServiceContainer.editorial.getAll
      .run()
      .then((res) =>
        response
          .status(200)
          .json(res.map((editorial) => editorial.mapToPrimitives()))
      )
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }

  async update(request: Request, response: Response) {
    const {
      nombre,
      direccion,
      anio_fundacion,
      id_pais,
      id_tipo_editorial,
      sitio_web,
      telefono,
      estado,
      libros,
    } = request.body;

    const { id } = request.params;

    await ServiceContainer.editorial.update.run(
      +id,
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
    .then(()=> response.status(200).json({message: "Editorial actualizada con éxito"}))
    .catch((error)=> response.status(error.statusCode).json({message: error.message}))
  }

  async delete(request: Request, response: Response){
    const { id } = request.params;

    await ServiceContainer.editorial.delete.run(+id)
    .then(() => response.status(200).json({message: "Editorial eliminada con exito"}))
    .catch((error) => response.status(error.statusCode).json({message: error.message}))
  }
}
