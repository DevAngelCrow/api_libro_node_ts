import { Editorial } from "../../../../domain/entities";
import { EditorialRepository } from "../../../../domain/repositories";

export class EditorialGetAll{
    constructor(private repository: EditorialRepository){}

    async run() : Promise<Editorial[]>{
        return this.repository.getAll();
    }
}