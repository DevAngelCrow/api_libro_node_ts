import { CustomError } from "../../../../domain";
import { AutorRepository } from "../../../../domain/repositories";
import { AutorId } from "../../../../domain/valueObject";

export class AutorDelete{
    constructor(private repository: AutorRepository){}

    async run(id: number) : Promise<void>{
        
        const autor = await this.repository.getOneById(new AutorId(id));

        if(!autor){
            throw CustomError.notFound("El autor no fue encontrado");
        }

        return this.repository.delete(new AutorId(id))
    }
}