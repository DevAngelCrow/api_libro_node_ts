import { TipoEditorial } from "../../../../domain/entities";
import { TipoEditorialRepository } from "../../../../domain/repositories";
import { TipoEditorialEstado, TipoEditorialNombreTipo } from "../../../../domain/valueObject";

export class TipoEditorialCreate{
    constructor(private repository: TipoEditorialRepository){}

    async run(
        nombre_tipo: string,
        estado: boolean = true,
    ):Promise<void>{
        const tipoEditorial = new TipoEditorial(
            new TipoEditorialNombreTipo(nombre_tipo),
            new TipoEditorialEstado(estado),
        );

        return this.repository.create(tipoEditorial);
    }
}