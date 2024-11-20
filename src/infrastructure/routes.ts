import { Router } from 'express';
import { LibroRoutes } from './controllers/libroController/libroRoutes';
import { AutorRoutes } from './controllers/autorController/autorRoutes';
import { EditorialRoutes } from './controllers/editorialController/editorialRoutes';
import { PaisRoutes } from './controllers/paisController/paisRoutes';
import { IdiomaRoutes } from './controllers/idiomaController/idiomaRoutes';

export class AppRoutes {
    static get routes() : Router {
        const router = Router();
        
        router.use('/api/libro',  LibroRoutes.routes );
        router.use('/api/autor' , AutorRoutes.routes ); 
        router.use('/api/editorial', EditorialRoutes.routes);
        router.use('/api/pais', PaisRoutes.routes);
        router.use('/api/idioma', IdiomaRoutes.routes);
        
        return router;
    }
}