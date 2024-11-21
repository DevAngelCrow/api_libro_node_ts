import { CustomError } from "../../../../domain";
import { Genero } from "../../../../domain/entities";
import { GeneroRepository } from "../../../../domain/repositories";
import { GeneroId } from "../../../../domain/valueObject";

export class GeneroGetOneById{
    constructor(private repository: GeneroRepository){}

    async run(id: number):Promise<Genero>{
        const genero = await this.repository.getOneById(new GeneroId(id));

        if(!genero){
            throw CustomError.notFound(`El genero con ${id} no fue encontrado`);
        }

        return genero;
    }
}