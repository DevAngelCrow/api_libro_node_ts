import { Router } from "express";
import { AutorController } from "./autor.controllers";

export class AutorRoutes{
    static get routes() : Router {

        const router = Router();
        const controller = new AutorController();

        router.post('/create', controller.createAutor );
        router.get('/:id', controller.getOneById);
        router.get('/autores/listado', controller.getAllAutores)

        return router;
    }
}