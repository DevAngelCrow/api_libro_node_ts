import { Router } from 'express';
import { LibroRoutes } from './controllers/libroController/libroRoutes';
import { AutorRoutes } from './controllers/autorController/autorRoutes';
import { EditorialRoutes } from './controllers/editorialController/editorialRoutes';

export class AppRoutes {
    static get routes() : Router {
        const router = Router();
        
        router.use('/api/libro',  LibroRoutes.routes );
        router.use('/api/autor' , AutorRoutes.routes ); 
        router.use('/api/editorial', EditorialRoutes.routes);
        
        return router;
    }
}