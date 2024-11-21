import { Router } from "express";
import { FormatoLibroController } from "./formatoLibroControllers";

export class FormatoLibroRoutes{
    static get routes() : Router {
        const router = Router();
        const controller = new FormatoLibroController();

        router.post('/create', controller.create );
        router.get('/grupo/listado', controller.getAll);
        router.get('/:id', controller.getOneById);
        router.put('/:id', controller.update);
        router.delete('/:id', controller.delete);

        return router;
    }
}