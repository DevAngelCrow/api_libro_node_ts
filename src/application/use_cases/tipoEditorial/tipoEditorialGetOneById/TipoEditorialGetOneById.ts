import { CustomError } from "../../../../domain";
import { TipoEditorial } from "../../../../domain/entities";
import { TipoEditorialRepository } from "../../../../domain/repositories";
import { TipoEditorialId } from "../../../../domain/valueObject";

export class TipoEditorialGetOneById{
    constructor(private repository: TipoEditorialRepository){}

    async run(id: number):Promise<TipoEditorial>{
        const tipoEditorial = await this.repository.getOneById(new TipoEditorialId(id));

        if(!tipoEditorial){
            throw CustomError.notFound(`El tipo de editorial ${id} no fue encontrado`);
        }

        return tipoEditorial;
    }
}