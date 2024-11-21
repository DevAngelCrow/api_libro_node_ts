import { Request, Response } from "express";
import { ServiceContainer } from "../../../shared/infraestructure/ServiceContainer";

export class FormatoLibroController{
    async create(request: Request, response: Response){
        const {formato, manufactura, estado} = request.body;
        await ServiceContainer.formato_libro.create.run(formato, manufactura, estado)
        .then(()=>response.status(201).json({message: "Formato de libro creado exitosamente"}))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}));
    }
    async update(request: Request, response: Response){
        const {formato, manufactura, estado} = request.body;
        const { id } = request.params;
        await ServiceContainer.formato_libro.update.run(+id, formato, manufactura, estado)
        .then(()=>response.status(200).json({message: "Formato de libro actualizado exitosamente"}))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}));
    }
    async getAll(request: Request, response: Response){
        await ServiceContainer.formato_libro.getAll.run()
        .then((formatoLibros)=>response.status(200).json(formatoLibros.map((formatoLibro) => formatoLibro.mapToPrimitives())))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}));
    }
    async getOneById(request: Request, response: Response){
        const { id } = request.params;
        await ServiceContainer.formato_libro.getOneById.run(+id)
        .then((formatoLibro)=>response.status(200).json(formatoLibro.mapToPrimitives()))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}));
    }
    async delete(request: Request, response: Response){
        const { id } = request.params;
        await ServiceContainer.formato_libro.delete.run(+id)
        .then(()=>response.status(200).json({message: "Formato de libro eliminada correctamente"}))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}));
    }
}