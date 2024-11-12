import { Router } from 'express';
import { LibroController } from './libro.controllers';


export class LibroRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new LibroController();


        router.post('/create', controller.createLibro );
        router.put('/update/:id', controller.editLibro );
        router.get('/libro/:id', controller.getLibroById );
        router.delete('/delete/:id', controller.delete );
        return router;
    }
}