import { Router } from 'express';
import { LibroRoutes } from './controllers/libroController/libroRoutes';

export class AppRoutes {
    static get routes() : Router {
        const router = Router();

        router.use('/api', LibroRoutes.routes() );
        return router;
    }
}