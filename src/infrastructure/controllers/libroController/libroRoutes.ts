import { Router } from 'express';
import { LibroController } from './libro.controllers';
import upload from '../../config/multer';


export class LibroRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new LibroController();


        router.post('/create', upload.single('portada'),controller.createLibro );
        router.put('/update/:id', controller.editLibro );
        router.get('/libro/:id', controller.getLibroById );
        router.delete('/delete/:id', controller.delete );
        router.get('/libros/listado', controller.getAllLibros);
        router.post('/upload/portada', controller.createUrlPortada);
        router.get('/get/image/libro', upload.single("image"),controller.getImageFile);
        return router;
    }
}