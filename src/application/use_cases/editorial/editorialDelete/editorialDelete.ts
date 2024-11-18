import { CustomError } from "../../../../domain";
import { EditorialRepository } from "../../../../domain/repositories";
import { EditorialId } from "../../../../domain/valueObject";

export class EditorialDelete{
    constructor(private repository: EditorialRepository){}

    async run(id: number):Promise<void>{
        const editorial = this.repository.getOneById(new EditorialId(id));

        if(!editorial){
            throw CustomError.notFound("La editorial no fue encontrada");
        }

        return this.repository.delete(new EditorialId(id));
    }
}