import { TipoEditorial } from "../../../../domain/entities";
import { TipoEditorialRepository } from "../../../../domain/repositories";

export class TipoEditorialGetAll{
    constructor(private repository: TipoEditorialRepository){}

    async run():Promise<TipoEditorial[]>{
        return this.repository.getAll();
    }
}