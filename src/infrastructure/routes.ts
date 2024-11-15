import { Router } from 'express';
import { LibroRoutes } from './controllers/libroController/libroRoutes';
import { AutorRoutes } from './controllers/autorController/autorRoutes';

export class AppRoutes {
    static get routes() : Router {
        const router = Router();
        
        router.use('/api/libro',  LibroRoutes.routes );
        router.use('/api/autor' , AutorRoutes.routes ); 
        
        return router;
    }
}