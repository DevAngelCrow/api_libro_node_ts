import { Request, Response } from "express";
import { ServiceContainer } from "../../../shared/infraestructure/ServiceContainer";

export class LibroController {
  async createLibro(request: Request, response: Response) {
    const {
      nombre,
      fecha_publicacion,
      id_genero,
      edicion,
      id_formato_libro,
      estado,
      resumen,
      numero_paginas,
      autores,
      editoriales,
      idiomas,
    } = request.body;

    const portada = request.file!;

    const formato_fecha = new Date(fecha_publicacion);

    await ServiceContainer.libro.create
      .run(
        nombre,
        formato_fecha,
        +id_genero,
        edicion,
        portada,
        +id_formato_libro,
        resumen,
        +numero_paginas,
        estado,
        autores,
        editoriales,
        idiomas
      )
      .then(() =>
        response.status(201).send({ message: "Libro creado exitosamente" })
      )
      .catch((error) => {
        response.status(error.statusCode).json({ message: error.message });
      });
  }

  async editLibro(request: Request, response: Response) {
    const {
      nombre,
      fecha_publicacion,
      id_genero,
      edicion,
      portada,
      id_formato_libro,
      estado,
      resumen,
      numero_paginas,
      portada_multimedia,
      autores,
      editoriales,
      idiomas
    } = request.body;

    const { id } = request.params;

    const formato_fecha = new Date(fecha_publicacion);
    await ServiceContainer.libro.update
      .run(
        +id,
        nombre,
        formato_fecha,
        id_genero,
        edicion,
        portada,
        id_formato_libro,
        estado,
        resumen,
        numero_paginas,
        portada_multimedia,
        autores,
        editoriales,
        idiomas
      )
      .then(() =>
        response.status(200).json({
          message: "Libro actualizado con exito!",
        })
      )
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }

  async getLibroById(request: Request, response: Response) {
    const { id } = request.params;

    await ServiceContainer.libro.getOneById
      .run(+id)
      .then((res) => {
        return response.status(200).json(res.mapToPrimitives());
      })
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await ServiceContainer.libro.delete
      .run(+id)
      .then(() => {
        return response.status(200).json({
          message: "Libro eliminado con éxito!",
        });
      })
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }

  async getAllLibros(request: Request, response: Response) {
    await ServiceContainer.libro.getAll
      .run()
      .then((res) => {
        return response
          .json(res.map((libro) => libro.mapToPrimitives()))
          .status(200);
      })
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }

  async createUrlPortada(request: Request, response: Response) {
    const { file } = request.body;
    await ServiceContainer.libro.createUrlPortada
      .run(file)
      .then((res) => {
        return console.log(res);
      })
      .catch((error) =>
        response.status(error.statusCode).json({ message: error.message })
      );
  }

  async getImageFile(request: Request, response: Response) {
    const id = request.query.id ? request.query.id.toString() : "";
    const index = id.indexOf("id=");
    const parametro = id.toString().substring(index + 3, id.length);
    await ServiceContainer.libro.getImageFile
      .run(parametro)
      .then((res) => {
        return response.set("Content-type", "image/jpeg").send(res);
      })
      .catch((error) => response.json({ message: error.message }));
  }

  async putImageFile(request: Request, response: Response) {
    const id = request.query.id ? request.query.id.toString() : "";

    const archivo = request.file!;
    await ServiceContainer.libro.editImageFile
      .run(id, archivo)
      .then(() =>
        response.status(200).send({ message: "Portada editada exitosamente" })
      )
      .catch((error) => {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      });
  }
}
