import { LibroRepository } from "../../../../domain/repositories/libro/LibroRepository";
import { LibroPortada } from "../../../../domain/valueObject";


export class LibroImagenUrlCreate {
    constructor(private repository: LibroRepository){}

    async run(portada: Express.Multer.File) : Promise<LibroPortada>{
        return this.repository.createUrlPortada(portada);
    }
}