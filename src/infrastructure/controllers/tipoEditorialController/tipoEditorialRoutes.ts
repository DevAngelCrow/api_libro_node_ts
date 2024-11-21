import { Router } from "express";
import { TipoEditorialController } from "./tipoEditorialControllers";

export class TipoEditorialRoutes{
    static get routes() : Router {
        const router = Router();
        const controller = new TipoEditorialController();

        router.post('/create', controller.create );
        router.get('/grupo/listado', controller.getAll);
        router.get('/:id', controller.getOneById);
        router.put('/:id', controller.update);
        router.delete('/:id', controller.delete);

        return router;
    }
}