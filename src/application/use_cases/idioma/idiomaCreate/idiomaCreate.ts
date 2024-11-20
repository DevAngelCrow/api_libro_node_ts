import { Idioma } from "../../../../domain/entities";
import { IdiomaRepository } from "../../../../domain/repositories";
import { IdiomaAbreviatura, IdiomaEstado, IdiomaIdioma, IdiomaRegion } from "../../../../domain/valueObject";


export class IdiomaCreate{
    constructor(private repository: IdiomaRepository){}

    async run(
        idioma: string,
        abreviatura: string,
        region: string,
        estado: boolean = true,
    ):Promise<void>{
        const idiomaRepo = new Idioma(
            new IdiomaIdioma(idioma),
            new IdiomaAbreviatura(abreviatura),
            new IdiomaRegion(region),
            new IdiomaEstado(estado)
        );

        return this.repository.create(idiomaRepo);
    }
}