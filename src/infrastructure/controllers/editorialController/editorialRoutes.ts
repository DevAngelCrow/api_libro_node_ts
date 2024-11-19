import { Router } from "express";
import { EditorialController } from "./editorial.controllers";

export class EditorialRoutes{
    static get routes() : Router {
        
        const router = Router();
        const controller = new EditorialController();

        router.post('/create', controller.create );

        return router;
    }
}