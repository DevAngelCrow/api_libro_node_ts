import { Pais } from "../../../../domain/entities";
import { PaisRepository } from "../../../../domain/repositories";

export class PaisGetAll{
    constructor(private repository: PaisRepository){}

    async run() : Promise<Pais[]>{
        return this.repository.getAll();
    }
}