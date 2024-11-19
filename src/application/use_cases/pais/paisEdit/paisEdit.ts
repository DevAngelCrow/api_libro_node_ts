import { CustomError } from "../../../../domain";
import { Pais } from "../../../../domain/entities";
import { PaisRepository } from "../../../../domain/repositories";
import { PaisAbreviacion, PaisCodigo, PaisEstado, PaisId, PaisNombre } from "../../../../domain/valueObject";

export class PaisEdit{
    constructor(private repository: PaisRepository){}

    async run(
        id: number,
        nombre: string,
        abreviacion: string,
        codigo: string,
        estado: boolean,
    ):Promise<void>{
        const pais = await this.repository.getOneById(new PaisId(id));

        if(!pais){
            throw CustomError.notFound("El país no se encuentra en los registros")
        }

        return this.repository.update(new Pais(
            new PaisNombre(nombre),
            new PaisAbreviacion(abreviacion),
            new PaisCodigo(codigo),
            new PaisEstado(estado),
            new PaisId(id)
        ))
    }
}