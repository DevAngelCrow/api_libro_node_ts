import { Genero } from "../../../../domain/entities";
import { GeneroRepository } from "../../../../domain/repositories";
import { GeneroDescripcion, GeneroEstado, GeneroNombre } from "../../../../domain/valueObject";

export class GeneroCreate{ 
    constructor(private repository: GeneroRepository){}
    async run(
        nombre: string,
        descripcion: string,
        estado: boolean = true,
    ):Promise<void>{
        const genero = new Genero(
            new GeneroNombre(nombre),
            new GeneroDescripcion(descripcion),
            new GeneroEstado(estado)
        );

        return this.repository.create(genero);
    }
}