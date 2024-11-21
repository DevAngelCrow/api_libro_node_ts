import { CustomError } from "../../../../domain";
import { TipoEditorial } from "../../../../domain/entities";
import { TipoEditorialRepository } from "../../../../domain/repositories";
import { TipoEditorialEstado, TipoEditorialId, TipoEditorialNombreTipo } from "../../../../domain/valueObject";

export class TipoEditorialEdit{
    constructor(private repository: TipoEditorialRepository){}

    async run(
        id: number,
        nombre_tipo: string,
        estado: boolean,
    ):Promise<void>{
        const tipoEditorialEdit = new TipoEditorial(
            new TipoEditorialNombreTipo(nombre_tipo),
            new TipoEditorialEstado(estado),
            new TipoEditorialId(id),
        );

        const tipoEditorialDb = await this.repository.getOneById(new TipoEditorialId(id));

        if(!tipoEditorialDb){throw CustomError.notFound(`El tipo de editorial ${id} no fue encontrado en los registros`)}

        return this.repository.update(tipoEditorialEdit);
    }
}