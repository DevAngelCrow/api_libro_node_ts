import { Request, Response } from "express";
import { ServiceContainer } from "../../../shared/infraestructure/ServiceContainer";

export class PaisController{

    async create(request: Request, response: Response){
        const { nombre, abreviacion, codigo} = request.body;
        await ServiceContainer.pais.create.run(nombre, abreviacion, codigo)
        .then(() => response.status(201).json({message: "registro de país creado exitosamente"}))
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }

    async getAll(request: Request, response: Response){
        await ServiceContainer.pais.getAll.run()
        .then((res) => response.status(200).json(res.map((pais) => pais.mapToPrimitives())))
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }

    async getOneById(request: Request, response: Response){
        const { id } = request.params;
        await ServiceContainer.pais.getOneById.run(+id)
        .then((res) => response.status(200).json(res.mapToPrimitives()))
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }

    async update(request: Request, response: Response){
        const { nombre, abreviacion, codigo, estado } = request.body;
        const { id } = request.params;
        await ServiceContainer.pais.update.run(+id, nombre, abreviacion, codigo, estado)
        .then(() => response.status(200).json({message: "Registro de país actualizado correctamente"}))
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }

    async delete(request: Request, response: Response){
        const { id } = request.params;
        await ServiceContainer.pais.delete.run(+id)
        .then(() => response.status(200).json({message: "Registro de país eliminado correctamente"}))
        .catch((error) => response.status(error.statusCode).json({message: error.message}))
    }
}