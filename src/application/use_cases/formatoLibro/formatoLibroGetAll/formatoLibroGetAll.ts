import { FormatoLibro } from "../../../../domain/entities";
import { FormatoLibroRepository } from "../../../../domain/repositories";

export class FormatoLibroGetAll{
    constructor(private repository: FormatoLibroRepository){}

    async run():Promise<FormatoLibro[]>{
        return this.repository.getAll();
    }
}