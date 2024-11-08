import { Libro } from "../../../../domain/entities/libro/libros.entity";
import { LibroRepository } from "../../../../domain/repositories/libro/LibroRepository";
import { LibroId } from "../../../../domain/valueObject";
import { CustomError } from "../../../../domain";

export class LibroGetOneById {
    constructor (private repository: LibroRepository){}

    async run(id: number) : Promise<Libro>{
        const user = await this.repository.getOneById(new LibroId(id));

        if(!user) throw CustomError.notFound("Libro no encontrado");

        return user;
    }
}