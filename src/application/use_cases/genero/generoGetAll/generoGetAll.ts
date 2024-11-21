import { Genero } from "../../../../domain/entities";
import { GeneroRepository } from "../../../../domain/repositories";

export class GeneroGetAll{
    constructor(private repository: GeneroRepository){}

    async run():Promise<Genero[]>{
        return this.repository.getAll();
    }
}