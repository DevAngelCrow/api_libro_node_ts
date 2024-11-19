import { DateTime } from "luxon";
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
      libros
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
        estado,
        libros
      )
      .then(() =>
        response.status(201).send({ message: "Autor creado exitosamente" })
      )
      .catch((error) => {
        response.status(error.statusCode).json({ message: error.message });
      });
  }

  async getOneById(request: Request, response: Response){
    const { id } = request.params;

    await ServiceContainer.autor.getOneById.run(+id)
    .then((res)=>{
      return response.status(200).json(res.mapToPrimitives());
    })
    .catch(error => response.status(error.statusCode).json({message: error.message}))


  }

  async getAllAutores(request: Request, response: Response){
    await ServiceContainer.autor.getAll.run()
    .then((res)=>{
      return response.status(200).json(res.map((autor) => autor.mapToPrimitives()))
    })
    .catch(error => response.status(error.statusCode).json({message: error.message}))
  }

  async putAutor(request: Request, response: Response){
    const { id } = request.params;

    const {
      nombres,
      apellidos,
      fecha_nacimiento,
      id_nacionalidad,
      telefono,
      email,
      estado,
      libros
    } = request.body;

    const formato_fecha = new Date(fecha_nacimiento);

    await ServiceContainer.autor.update.run(
      +id,
      nombres,
      apellidos,
      formato_fecha,
      id_nacionalidad,
      telefono,
      email,
      estado,
      libros
    )
    .then(() => response.status(200).send({message: "Autor actualizado con éxito!"}))
    .catch((error) => response.status(500).json({message: error.message}))
  }

  async deleteAutor(request: Request, response: Response){
    const { id } = request.params;

    await ServiceContainer.autor.delete.run(+id)
    .then(() => response.status(200).json({message: "Autor desactivado con éxito!"}))
    .catch((error) => response.status(error.statusCode).json({message: error.message}))
  }
}
