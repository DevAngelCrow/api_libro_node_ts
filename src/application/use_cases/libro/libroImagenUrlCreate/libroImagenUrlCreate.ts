import { LibroRepository } from "../../../../domain/repositories/libro/LibroRepository";
import { LibroPortada } from "../../../../domain/valueObject";


export class LibroImagenUrlCreate {
    constructor(private repository: LibroRepository){}

    async run(portada: Express.Multer.File) : Promise<LibroPortada>{
        //const portadaUrl = new LibroPortada(portada.filename.toString());
        //const file = portada as Express.Multer.File;
        return this.repository.createUrlPortada(portada);
    }
}