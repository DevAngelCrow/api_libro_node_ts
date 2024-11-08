import { Router } from 'express';
import { LibroController } from './libro.controllers';


export class LibroRoutes {
    static routes(): Router {
        const router = Router();
        const controller = new LibroController();


        router.post('/create', controller.createLibro );

        return router;
    }
}