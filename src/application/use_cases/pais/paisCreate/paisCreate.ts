import { Pais } from "../../../../domain/entities";
import { PaisRepository } from "../../../../domain/repositories";
import { PaisAbreviacion, PaisCodigo, PaisEstado, PaisNombre } from "../../../../domain/valueObject";

export class PaisCreate{
    constructor(private repository: PaisRepository){}

    async run(
        nombre: string,
        abreviacion: string,
        codigo: string,
        estado: boolean = true,
    ){
        return this.repository.create(new Pais(
            new PaisNombre(nombre),
            new PaisAbreviacion(abreviacion),
            new PaisCodigo(codigo),
            new PaisEstado(estado)
        ))
    }
}