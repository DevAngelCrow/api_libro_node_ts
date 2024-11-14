import { LibroCreate } from "../../application/use_cases/libro/libroCreate/libroCreate";
import { LibroDelete } from "../../application/use_cases/libro/libroDelete/libroDelete";
import { LibroEdit } from "../../application/use_cases/libro/libroEdit/libroEdit";
import { LibroGetAll } from "../../application/use_cases/libro/libroGetAll/libroGetAll";
import { LibroGetFileImage } from "../../application/use_cases/libro/libroGetFileImage/libroGetFileImage";
import { LibroGetOneById } from "../../application/use_cases/libro/libroGetOneById/libroGetOneById";
import { LibroImagenUrlCreate } from "../../application/use_cases/libro/libroImagenUrlCreate/libroImagenUrlCreate";
import { ImplLibroRepository } from "../../infrastructure/implementation/libroRepository/impl.LibroRepository";

const libroRepository = new ImplLibroRepository();

export const ServiceContainer = {
    libro: {
        getAll: new LibroGetAll(libroRepository),
        getOneById: new LibroGetOneById(libroRepository),
        delete: new LibroDelete(libroRepository),
        update: new LibroEdit(libroRepository),
        create: new LibroCreate(libroRepository),
        createUrlPortada: new LibroImagenUrlCreate(libroRepository),
        getImageFile: new LibroGetFileImage(libroRepository),
    }
}