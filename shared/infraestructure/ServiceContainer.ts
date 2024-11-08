import { LibroCreate } from "../../src/application/use_cases/libro/libroCreate/libroCreate";
import { LibroDelete } from "../../src/application/use_cases/libro/libroDelete/libroDelete";
import { LibroEdit } from "../../src/application/use_cases/libro/libroEdit/libroEdit";
import { LibroGetAll } from "../../src/application/use_cases/libro/libroGetAll/libroGetAll";
import { LibroGetOneById } from "../../src/application/use_cases/libro/libroGetOneById/libroGetOneById";
import { ImplLibroRepository } from "../../src/infrastructure/implementation/libroRepository/impl.LibroRepository";

const libroRepository = new ImplLibroRepository();

export const ServiceContainer = {
    libro: {
        getAll: new LibroGetAll(libroRepository),
        getOneById: new LibroGetOneById(libroRepository),
        delete: new LibroDelete(libroRepository),
        update: new LibroEdit(libroRepository),
        create: new LibroCreate(libroRepository)
    }
}