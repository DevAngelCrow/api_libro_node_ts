import { Libro } from "../../entities/libro/libros.entity";
import { LibroId, LibroPortada } from "../../valueObject";

export interface LibroRepository {
    create(libro: Libro): Promise<void>;
    getAll(): Promise<Libro[]>
    getOneById(id: LibroId): Promise<Libro | null>;
    update(libro: Libro): Promise<void>;
    delete(id: LibroId): Promise<void>;
    createUrlPortada(libro: Express.Multer.File) : Promise<LibroPortada>;
    getImgPortada(urlPortada: string):Promise<Buffer>;
    editImgPortada(id: string, archivo: Express.Multer.File):Promise<LibroPortada>
}