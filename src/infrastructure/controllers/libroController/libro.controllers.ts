import { Request, Response } from "express";
import { ServiceContainer } from "../../../shared/infraestructure/ServiceContainer";



export class LibroController {

  async createLibro(request: Request, response: Response) {
    const {
      nombre,
      fecha_publicacion,
      id_genero,
      edicion,
      portada,
      id_formato_libro,
      estado,
      id_idioma,
      resumen,
      numero_paginas,
    } = request.body;
    console.log(request.file, 'así va portada')
    const formato_fecha = new Date(fecha_publicacion); 
      await ServiceContainer.libro.create.run(
        nombre,
        formato_fecha,
        id_genero,
        edicion,
        portada,
        id_formato_libro,
        id_idioma,
        resumen,
        numero_paginas,
        estado,
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
      edicion,
      portada,
      id_formato_libro,
      estado,
      id_idioma,
      resumen,
      numero_paginas,
    } = request.body;

    const { id }  = request.params;
   
    const formato_fecha = new Date(fecha_publicacion);
    await ServiceContainer.libro.update.run(
      Number(id),
      nombre,
      formato_fecha,
      id_genero,
      edicion,
      portada,
      id_formato_libro,
      estado,
      id_idioma,
      resumen,
      numero_paginas
    )
    .then(()=> response.status(200).json({
      message: "Libro actualizado con exito!"
    }))
    .catch(error => response.status(error.statusCode).json({message: error.message}));
  }

  async getLibroById(request: Request, response: Response){
    const { id } = request.params;
    
     await ServiceContainer.libro.getOneById.run(Number(id))
    .then((res)=>{
      return response.status(200).json(res.mapToPrimitives())
    })
    .catch(error => response.status(error.statusCode).json({message: error.message}))
  }

  async delete(request: Request, response: Response){
    const { id } = request.params;

    await ServiceContainer.libro.delete.run(Number(id))
    .then(()=>{
      return response.status(200).json({
        message: "Libro eliminado con éxito!"
      })
    })
    .catch(error => response.status(error.statusCode).json({message: error.message}))
  }

  async getAllLibros(request: Request, response: Response){
    await ServiceContainer.libro.getAll.run()
    .then((res)=>{
      return response.json(res.map((libro) => libro.mapToPrimitives())).status(200)
    })
    .catch(error => response.status(error.statusCode).json({message: error.message}))
  }

  async createUrlPortada(request: Request, response: Response){
    const { file } = request.body;
    console.log(request.body, 'el body en el controlador')
    await ServiceContainer.libro.createUrlPortada.run(file)
    .then(() => {
      return response.send(`File received: ${request.file}`)
    })
  }
}
