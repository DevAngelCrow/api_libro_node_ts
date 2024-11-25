import { Router } from 'express';
import { LibroRoutes } from './controllers/libroController/libroRoutes';
import { AutorRoutes } from './controllers/autorController/autorRoutes';
import { EditorialRoutes } from './controllers/editorialController/editorialRoutes';
import { PaisRoutes } from './controllers/paisController/paisRoutes';
import { IdiomaRoutes } from './controllers/idiomaController/idiomaRoutes';
import { TipoEditorialRoutes } from './controllers/tipoEditorialController/tipoEditorialRoutes';
import { GeneroRoutes } from './controllers/generoController/generoRoutes';
import { FormatoLibroRoutes } from './controllers/formatoLibroController/formatoLibroRoutes';

export class AppRoutes {
    static get routes() : Router {
        const router = Router();
        
        router.use('/api/libro',  LibroRoutes.routes );
        router.use('/api/autor' , AutorRoutes.routes ); 
        router.use('/api/editorial', EditorialRoutes.routes);
        router.use('/api/pais', PaisRoutes.routes);
        router.use('/api/idioma', IdiomaRoutes.routes);
        router.use('/api/tipo-editorial', TipoEditorialRoutes.routes);
        router.use('/api/genero', GeneroRoutes.routes);
        router.use('/api/formato-libro', FormatoLibroRoutes.routes);
        
        
        return router;
    }
}