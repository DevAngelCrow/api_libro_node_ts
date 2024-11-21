import { FormatoLibroRepository } from "../../../../domain/repositories";
import { FormatoLibroId } from "../../../../domain/valueObject";

export class FormatoLibroDelete {
    constructor(private repository: FormatoLibroRepository){}

    async run(id: number):Promise<void>{
        const formatoLibro = await this.repository.getOneById(new FormatoLibroId(id));
        if(!formatoLibro){throw `El formato del libro con id ${id} no fue encontrado en los registros`}
        return this.repository.delete(new FormatoLibroId(id));
    }
}