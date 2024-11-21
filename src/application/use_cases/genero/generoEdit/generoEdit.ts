import { CustomError } from "../../../../domain";
import { Genero } from "../../../../domain/entities";
import { GeneroRepository } from "../../../../domain/repositories";
import { GeneroDescripcion, GeneroEstado, GeneroId, GeneroNombre } from "../../../../domain/valueObject";

export class GeneroEdit{
    constructor(private repository: GeneroRepository){}

    async run(
        id: number,
        nombre: string,
        descripcion: string,
        estado: boolean,
    ):Promise<void>{
        const generoEdit = new Genero(
            new GeneroNombre(nombre),
            new GeneroDescripcion(descripcion),
            new GeneroEstado(estado),
            new GeneroId(id),
        );

        const generoDb = await this.repository.getOneById(new GeneroId(id));

        if(!generoDb){throw CustomError.notFound(`El genero con ${id} no fue encontrado en los registros`)}

        return this.repository.update(generoEdit);
    }
}