import { Router } from "express";
import { GeneroController } from "./generoControllers";

export class GeneroRoutes{
    static get routes() : Router {
        const router = Router();
        const controller = new GeneroController();

        router.post('/create', controller.create );
        router.get('/generos/listado', controller.getAll);
        router.get('/:id', controller.getOneById);
        router.put('/:id', controller.update);
        router.delete('/:id', controller.delete);

        return router;
    }
}