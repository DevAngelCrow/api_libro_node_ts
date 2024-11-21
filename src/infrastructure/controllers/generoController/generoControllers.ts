import { Request, Response } from "express";
import { ServiceContainer } from "../../../shared/infraestructure/ServiceContainer";

export class GeneroController{

    async create(request: Request, response: Response){
        const { nombre, descripcion, estado} = request.body;
        await ServiceContainer.genero.create.run(nombre, descripcion, estado)
        .then(() => response.status(201).json({message: "registro de genero creado exitosamente"}))
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }

    async getAll(request: Request, response: Response){
        await ServiceContainer.genero.getAll.run()
        .then((res) => response.status(200).json(res.map((genero) => genero.mapToPrimitives())))
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }

    async getOneById(request: Request, response: Response){
        const { id } = request.params;
        await ServiceContainer.genero.getOneById.run(+id)
        .then((res) => response.status(200).json(res.mapToPrimitives()))
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }

    async update(request: Request, response: Response){
        const { nombre, descripcion, estado } = request.body;
        const { id } = request.params;
        await ServiceContainer.genero.update.run(+id, nombre, descripcion, estado)
        .then(() => response.status(200).json({message: "Registro de genero actualizado correctamente"}))
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }

    async delete(request: Request, response: Response){
        const { id } = request.params;
        await ServiceContainer.genero.delete.run(+id)
        .then(() => response.status(200).json({message: "Registro de genero eliminado correctamente"}))
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }
}