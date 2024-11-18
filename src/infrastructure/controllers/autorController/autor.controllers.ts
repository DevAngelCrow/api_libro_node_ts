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

  async getOneById(request: Request, response: Response){
    console.log('controlador getByid')
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
}
