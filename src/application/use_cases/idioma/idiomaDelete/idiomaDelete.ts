import { CustomError } from "../../../../domain";
import { IdiomaRepository } from "../../../../domain/repositories";
import { IdiomaId } from "../../../../domain/valueObject";

export class IdiomaDelete{
    constructor(private repository: IdiomaRepository){}

    async run(id: number):Promise<void>{
        const idioma = await this.repository.getOneById(new IdiomaId(id));

        if(!idioma){throw CustomError.notFound("El registro de idioma no fue encontrado")}

        return this.repository.delete(new IdiomaId(id));
    }
}