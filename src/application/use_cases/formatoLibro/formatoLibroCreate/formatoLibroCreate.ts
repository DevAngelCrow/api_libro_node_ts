import { FormatoLibro } from "../../../../domain/entities";
import { FormatoLibroRepository } from "../../../../domain/repositories";
import { FormatoLibroEstado, FormatoLibroFormato, FormatoLibroManufactura } from "../../../../domain/valueObject";

export class FormatoLibroCreate{ 
    constructor(private repository: FormatoLibroRepository){}
    async run(
        formato: string,
        manufactura: string,
        estado: boolean = true,
    ):Promise<void>{
        const formatoLibro = new FormatoLibro(
            new FormatoLibroFormato(formato),
            new FormatoLibroManufactura(manufactura),
            new FormatoLibroEstado(estado)
        );

        return this.repository.create(formatoLibro);
    }
}