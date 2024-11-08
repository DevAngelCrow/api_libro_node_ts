import { LibroRepository } from "../../../../domain/repositories/libro/LibroRepository";
import { LibroId } from "../../../../domain/valueObject";

export class LibroDelete {
    constructor (private repository: LibroRepository){}

    async run(id: number): Promise<void> {
        await  this.repository.delete(new LibroId(id));
    }
}