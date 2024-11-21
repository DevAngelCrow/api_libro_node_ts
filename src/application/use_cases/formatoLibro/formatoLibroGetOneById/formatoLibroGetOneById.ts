import { CustomError } from "../../../../domain";
import { FormatoLibro } from "../../../../domain/entities";
import { FormatoLibroRepository } from "../../../../domain/repositories";
import { FormatoLibroId } from "../../../../domain/valueObject";

export class FormatoLibroGetOneById{
    constructor(private repository: FormatoLibroRepository){}

    async run(id: number):Promise<FormatoLibro>{
        const formatoLibro = await this.repository.getOneById(new FormatoLibroId(id));

        if(!formatoLibro){
            throw CustomError.notFound(`El formato de libro con id ${id} no fue encontrado`);
        }

        return formatoLibro;
    }
}