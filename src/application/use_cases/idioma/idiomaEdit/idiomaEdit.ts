import { CustomError } from "../../../../domain";
import { Idioma } from "../../../../domain/entities";
import { IdiomaRepository } from "../../../../domain/repositories";
import { IdiomaAbreviatura, IdiomaEstado, IdiomaId, IdiomaIdioma, IdiomaRegion } from "../../../../domain/valueObject";

export class IdiomaEdit{
    constructor(private repository: IdiomaRepository){}

    async run(
        id: number,
        idioma: string,
        abreviatura: string,
        region: string,
        estado: boolean,
    ):Promise<void>{
        

        const idiomaEdit = new Idioma(
            new IdiomaIdioma(idioma),
            new IdiomaAbreviatura(abreviatura),
            new IdiomaRegion(region),
            new IdiomaEstado(estado),
            new IdiomaId(id)
        );

        const idiomaRepo = await this.repository.getOneById(new IdiomaId(id));
        if(!idiomaRepo){throw CustomError.notFound("El registro de idioma no fue encontrado")}

        return  this.repository.update(idiomaEdit);
    }
}