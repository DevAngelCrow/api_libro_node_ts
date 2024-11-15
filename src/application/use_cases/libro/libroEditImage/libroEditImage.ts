import { LibroRepository } from "../../../../domain/repositories/index";
import { LibroPortada } from "../../../../domain/valueObject";

export class LibroEditImage {
    constructor (private repository: LibroRepository){}

    async run(id: string, archivo: Express.Multer.File) : Promise<LibroPortada>{
        return this.repository.editImgPortada(id, archivo)
    }
}