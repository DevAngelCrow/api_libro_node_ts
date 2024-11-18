import { AutorGetOneById, EditorialCreate, EditorialDelete, EditorialEdit, EditorialGetAll, EditorialGetOneById } from "../../application/use_cases";
import { AutorCreate } from "../../application/use_cases/autor/autorCreate/autorCreate";
import { AutorDelete } from "../../application/use_cases/autor/autorDelete/autorDelete";
import { AutorEdit } from "../../application/use_cases/autor/autorEdit/autorEdit";
import { AutorGetAll } from "../../application/use_cases/autor/autorGetAll/autorGetAll";
import { LibroCreate } from "../../application/use_cases/libro/libroCreate/libroCreate";
import { LibroDelete } from "../../application/use_cases/libro/libroDelete/libroDelete";
import { LibroEdit } from "../../application/use_cases/libro/libroEdit/libroEdit";
import { LibroEditImage } from "../../application/use_cases/libro/libroEditImage/libroEditImage";
import { LibroGetAll } from "../../application/use_cases/libro/libroGetAll/libroGetAll";
import { LibroGetFileImage } from "../../application/use_cases/libro/libroGetFileImage/libroGetFileImage";
import { LibroGetOneById } from "../../application/use_cases/libro/libroGetOneById/libroGetOneById";
import { LibroImagenUrlCreate } from "../../application/use_cases/libro/libroImagenUrlCreate/libroImagenUrlCreate";
import { ImplAutorRepository } from "../../infrastructure/implementation/autorRepository/impl.AutorRepository";
import { ImplEditorialRepository } from "../../infrastructure/implementation/editorialRepository/impl.EditorialRepository";
import { ImplLibroRepository } from "../../infrastructure/implementation/libroRepository/impl.LibroRepository";

const libroRepository = new ImplLibroRepository();
const autorRepository = new ImplAutorRepository();
const editorialRepository = new ImplEditorialRepository();

export const ServiceContainer = {
    libro: {
        getAll: new LibroGetAll(libroRepository),
        getOneById: new LibroGetOneById(libroRepository),
        delete: new LibroDelete(libroRepository),
        update: new LibroEdit(libroRepository),
        create: new LibroCreate(libroRepository),
        createUrlPortada: new LibroImagenUrlCreate(libroRepository),
        getImageFile: new LibroGetFileImage(libroRepository),
        editImageFile: new LibroEditImage(libroRepository),
    },
    autor: {
        create: new AutorCreate(autorRepository),
        update: new AutorEdit(autorRepository),
        delete: new AutorDelete(autorRepository),
        getAll: new AutorGetAll(autorRepository),
        getOneById: new AutorGetOneById(autorRepository)
    },
    editorial: {
        create: new EditorialCreate(editorialRepository),
        update: new EditorialEdit(editorialRepository),
        delete: new EditorialDelete(editorialRepository),
        getAll: new EditorialGetAll(editorialRepository),
        getOneById: new EditorialGetOneById(editorialRepository)
    }
}