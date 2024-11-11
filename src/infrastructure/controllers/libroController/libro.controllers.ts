import { Request, Response } from "express";
import { ServiceContainer } from "../../../../shared/infraestructure/ServiceContainer";


export class LibroController {

  async createLibro(request: Request, response: Response) {
    const {
      id,
      nombre,
      fecha_publicacion,
      id_genero,
      id_indice_libro,
      edicion,
      portada,
      id_formato_libro,
      estado,
    } = request.body;


    const formato_fecha = new Date(fecha_publicacion);
    const libro = 
      await ServiceContainer.libro.create.run(
        id,
        nombre,
        formato_fecha,
        id_genero,
        id_indice_libro,
        edicion,
        portada,
        id_formato_libro,
        estado
      )
      .then(()=> response.status(201).send({message: "Libro creado exitosamente"}))
      .catch( error => {
        response.status(error.statusCode).json({message: error.message})
      })

  }

  async editLibro(request: Request, response: Response){
    const {
      nombre,
      fecha_publicacion,
      id_genero,
      id_indice_libro,
      edicion,
      portada,
      id_formato_libro,
      estado
    } = request.body;

    const { id }  = request.params;
   
    const formato_fecha = new Date(fecha_publicacion);
    const libro = await ServiceContainer.libro.update.run(
      Number(id),
      nombre,
      formato_fecha,
      id_genero,
      id_indice_libro,
      edicion,
      portada,
      id_formato_libro,
      estado
    )
    .then(()=> response.status(200).json({
      message: "Libro actualizado con exito!"
    }))
    .catch(error => response.status(error.statusCode).json({message: error.message}));
  }
}
