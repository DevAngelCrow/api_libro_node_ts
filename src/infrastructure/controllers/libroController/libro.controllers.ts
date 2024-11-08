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
        id_formato_libro
      )
      .then(()=> response.status(201).send({message: "Libro creado exitosamente"}))
      .catch( error => response.status(400).json({error}))

      
    
    

    
  }
}
