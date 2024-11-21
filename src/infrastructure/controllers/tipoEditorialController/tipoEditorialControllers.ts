import { Request, Response } from "express";
import { ServiceContainer } from "../../../shared/infraestructure/ServiceContainer";

export class TipoEditorialController{
    async create(request: Request, response: Response){
        const {nombre_tipo, estado} = request.body;
        await ServiceContainer.tipo_Editorial.create.run(nombre_tipo, estado)
        .then(()=>response.status(201).json({message: "Tipo de editorial creado exitosamente"}))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}));
    }
    async update(request: Request, response: Response){
        const {nombre_tipo, estado} = request.body;
        const { id } = request.params;
        await ServiceContainer.tipo_Editorial.update.run(+id, nombre_tipo, estado)
        .then(()=>response.status(200).json({message: "Tipo de editorial actualizado exitosamente"}))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}));
    }
    async getAll(request: Request, response: Response){
        await ServiceContainer.tipo_Editorial.getAll.run()
        .then((tipoEditoriales)=>response.status(200).json(tipoEditoriales.map((tipoEditorial) => tipoEditorial.mapToPrimitives())))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}));
    }
    async getOneById(request: Request, response: Response){
        const { id } = request.params;
        await ServiceContainer.tipo_Editorial.getOneById.run(+id)
        .then((tipoEditoriales)=>response.status(200).json(tipoEditoriales.mapToPrimitives()))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}));
    }
    async delete(request: Request, response: Response){
        const { id } = request.params;
        await ServiceContainer.tipo_Editorial.delete.run(+id)
        .then(()=>response.status(200).json({message: "Tipo de editorial eliminada correctamente"}))
        .catch((error)=> response.status(error.statusCode).json({message: error.message}));
    }
}