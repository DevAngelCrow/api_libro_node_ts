import { Idioma } from "../../../../domain/entities";
import { IdiomaRepository } from "../../../../domain/repositories";

export class IdiomaGetAll{
    constructor(private repository: IdiomaRepository){}
    
    async run():Promise<Idioma[]>{
        return this.repository.getAll();
    }
}
