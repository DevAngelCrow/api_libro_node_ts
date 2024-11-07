import { Libro } from "../../entities/libro/libros.entity";

export interface LibroRepository {
    findById(id: number):Promise<Libro | null>
    save(libro: Libro): Promise<Libro>;
    deleteById(id: number):Promise<void>
}