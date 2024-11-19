import { CustomError } from "../../../../domain";
import { PaisRepository } from "../../../../domain/repositories";
import { PaisId } from "../../../../domain/valueObject";

export class PaisDelete{
    constructor(private repository: PaisRepository){}

    async run(id: number):Promise<void>{
        const pais = await this.repository.getOneById(new PaisId(id));

        if(!pais){
            throw CustomError.notFound("El país no existe en los registros")
        }

        return this.repository.delete(new PaisId(id));
    }
}