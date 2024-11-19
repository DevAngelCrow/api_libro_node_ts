import { Router } from "express";
import { EditorialController } from "./editorial.controllers";

export class EditorialRoutes{
    static get routes() : Router {
        
        const router = Router();
        const controller = new EditorialController();

        router.post('/create', controller.create );
        router.get('/:id', controller.getOneById );
        router.get('/get/listado', controller.getAll );
        router.put('/update/:id', controller.update );
        router.delete('/:id', controller.delete );

        return router;
    }
}