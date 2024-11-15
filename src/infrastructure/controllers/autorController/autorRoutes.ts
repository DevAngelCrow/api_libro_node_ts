import { Router } from "express";
import { AutorController } from "./autor.controllers";

export class AutorRoutes{
    static get routes() : Router {

        const router = Router();
        const controller = new AutorController();

        router.post('/create', controller.createAutor );

        return router;
    }
}