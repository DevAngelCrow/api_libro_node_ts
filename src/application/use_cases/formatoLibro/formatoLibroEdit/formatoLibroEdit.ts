import { CustomError } from "../../../../domain";
import { FormatoLibro } from "../../../../domain/entities";
import { FormatoLibroRepository } from "../../../../domain/repositories";
import { FormatoLibroEstado, FormatoLibroFormato, FormatoLibroId, FormatoLibroManufactura } from "../../../../domain/valueObject";

export class FormatoLibroEdit{
    constructor(private repository: FormatoLibroRepository){}

    async run(
        id: number,
        formato: string,
        manufactura: string,
        estado: boolean,
    ):Promise<void>{
        const formatoLibroEdit = new FormatoLibro(
            new FormatoLibroFormato(formato),
            new FormatoLibroManufactura(manufactura),
            new FormatoLibroEstado(estado),
            new FormatoLibroId(id),
        );

        const formatoDb = await this.repository.getOneById(new FormatoLibroId(id));

        if(!formatoDb){throw CustomError.notFound(`El formato de libro con id ${id} no fue encontrado en los registros`)}

        return this.repository.update(formatoLibroEdit);
    }
}