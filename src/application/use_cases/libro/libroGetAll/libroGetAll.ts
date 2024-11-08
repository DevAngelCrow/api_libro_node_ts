import { Libro } from "../../../../domain/entities/libro/libros.entity";
import { LibroRepository } from "../../../../domain/repositories/libro/LibroRepository";

export class LibroGetAll {
    constructor (private repository: LibroRepository){}

    async run(): Promise<Libro[]>{
        return this.repository.getAll();
    }
}