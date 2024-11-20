import { CustomError } from "../../../../domain";
import { Idioma } from "../../../../domain/entities";
import { IdiomaRepository } from "../../../../domain/repositories";
import { IdiomaId } from "../../../../domain/valueObject";

export class IdiomaGetOneById{
    constructor(private repository: IdiomaRepository){}

    async run(id: number):Promise<Idioma>{
        const idioma = await this.repository.getOneById(new IdiomaId(id));
        console.log('en el getByiD')
        if(!idioma){ throw CustomError.notFound("Registro de idioma no fue encontrado")}

        return idioma;
    }
}