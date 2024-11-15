import { Autor } from "../../../../domain/entities";
import { AutorRepository } from "../../../../domain/repositories";

export class AutorGetAll{
    constructor(private repository: AutorRepository){}

    async run() : Promise<Autor[]>{
        return this.repository.getAll()
    }
}