import { Request, Response } from "express";
import { ServiceContainer } from "../../../shared/infraestructure/ServiceContainer";

export class IdiomaController{
    async create(request: Request, response: Response){
        const { idioma, abreviatura, region, estado } = request.body;
        await ServiceContainer.idioma.create.run(idioma, abreviatura, region, estado)
        .then(() => response.status(201).json({message: "Registro de idioma creado exitosamente"}))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}));
    }

    async update(request: Request, response: Response){
        const { id } = request.params;
        const { idioma, abreviatura, region, estado } = request.body;

        await ServiceContainer.idioma.update.run(+id, idioma, abreviatura, region, estado)
        .then(() => response.status(200).json({message: "Registro de idioma actualizado exitosamente"}))
        .catch((error) => response.status(error.statusCode).json({message: error.message}));

    }

    async getAll(request: Request, response: Response){

        await ServiceContainer.idioma.getAll.run()
        .then((idiomas)=> response.status(200).json(idiomas.map((idioma)=> idioma.mapToPrimitives())))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}));
    }

    async getOneById(request: Request, response: Response){
        const { id } = request.params;
        await ServiceContainer.idioma.getOneById.run(+id)
        .then((idioma)=>response.status(200).json(idioma.mapToPrimitives()))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}));
    }

    async delete(request: Request, response: Response){
        const { id } = request.params;
        await ServiceContainer.idioma.delete.run(+id)
        .then(() => response.status(200).json({message: "Registro de idioma eliminado exitosamente"}))
        .catch((error) => response.status(error.statusCode).json({message: error.message}));

    }
}