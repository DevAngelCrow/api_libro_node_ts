import { GeneroRepository } from "../../../../domain/repositories";
import { GeneroId } from "../../../../domain/valueObject";

export class GeneroDelete {
    constructor(private repository: GeneroRepository){}

    async run(id: number):Promise<void>{
        const genero = await this.repository.getOneById(new GeneroId(id));
        if(!genero){throw `El genero con ${id} no fue encontrado en los registros`}
        return this.repository.delete(new GeneroId(id));
    }
}