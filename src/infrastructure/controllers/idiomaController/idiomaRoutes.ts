import { Router } from "express";
import { IdiomaController } from "./idioma.controllers";

export class IdiomaRoutes{

    static get routes() : Router{
        const router = Router();
        const controller = new IdiomaController();

        router.post('/create', controller.create);
        router.put('/:id', controller.update);
        router.get('/listado', controller.getAll);
        router.get('/idioma/:id', controller.getOneById);
        router.delete('/:id', controller.delete);

        return router;
    }
}