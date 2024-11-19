import { Router } from "express";
import { PaisController } from "./pais.controllers";

export class PaisRoutes{
    static get routes() : Router {
        const router = Router();
        const controller = new PaisController();

        router.post('/create', controller.create );
        router.get('/paises/listado', controller.getAll);
        router.get('/:id', controller.getOneById);
        router.put('/:id', controller.update);
        router.delete('/:id', controller.delete);

        return router;
    }
}