import { CustomError } from "../../../../domain";
import { LibroRepository } from "../../../../domain/repositories/libro/LibroRepository";
import { LibroFechaPublicacion, LibroId, LibroNombre } from "../../../../domain/valueObject";

export class LibroDelete {
    constructor (private repository: LibroRepository){}

    async run(id: number): Promise<void> {
        const libroDB = await this.repository.getOneById(new LibroId(id));
        if(!libroDB){
            throw CustomError.notFound("El libro no fue encontrado");
        }
        
        return this.repository.delete(new LibroId(id))
    }
}