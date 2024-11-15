import { Readable } from "stream";
import { LibroRepository } from "../../../../domain/repositories/index";

export class LibroGetFileImage{
    constructor(private repository: LibroRepository){}

    async run(portada: string) : Promise<Buffer>{
        return this.repository.getImgPortada(portada);
    }
}