import { CustomError } from "../../../../domain";
import { Autor } from "../../../../domain/entities";
import { AutorRepository } from "../../../../domain/repositories";
import { AutorId } from "../../../../domain/valueObject";

export class AutorGetOneById{
    constructor(private repository: AutorRepository){}

    async run(id: number) : Promise<Autor>{
        const autor = await this.repository.getOneById(new AutorId(id));

        if(!autor){
            throw CustomError.notFound("Autor no encontrado");
        }

        return autor;
    }
}