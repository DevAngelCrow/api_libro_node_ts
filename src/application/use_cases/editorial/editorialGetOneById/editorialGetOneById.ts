import { CustomError } from "../../../../domain";
import { Editorial } from "../../../../domain/entities";
import { EditorialRepository } from "../../../../domain/repositories";
import { EditorialId } from "../../../../domain/valueObject";

export class EditorialGetOneById{
    constructor(private repository: EditorialRepository){}

    async run(id: number):Promise<Editorial>{
        const editorial = await this.repository.getOneById(new EditorialId(id));

        if(!editorial){
            throw CustomError.notFound("Editorial no encontrada")
        }

        return editorial;
    }
}