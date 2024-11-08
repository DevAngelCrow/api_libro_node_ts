import { Libro } from "../../entities/libro/libros.entity";
import { LibroId } from "../../valueObject";

export interface LibroRepository {
    create(libro: Libro): Promise<void>;
    getAll(): Promise<Libro[]>
    getOneById(id: LibroId): Promise<Libro | null>;
    update(libro: Libro): Promise<void>;
    delete(id: LibroId): Promise<void>;
}