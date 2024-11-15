import { Libro } from "../../../../domain/entities/libro/libros.entity";
import { LibroRepository } from "../../../../domain/repositories/index";
import { LibroId } from "../../../../domain/valueObject";
import { CustomError } from "../../../../domain";

export class LibroGetOneById {
    constructor (private repository: LibroRepository){}

    async run(id: number) : Promise<Libro>{
        const libro = await this.repository.getOneById(new LibroId(id));

        if(!libro) throw CustomError.notFound("Libro no encontrado");
        
        return libro;
    }
}