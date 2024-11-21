import { TipoEditorialRepository } from "../../../../domain/repositories";
import { TipoEditorialId } from "../../../../domain/valueObject";

export class TipoEditorialDelete {
    constructor(private repository: TipoEditorialRepository){}

    async run(id: number):Promise<void>{
        const tipoEditorial = await this.repository.getOneById(new TipoEditorialId(id));
        if(!tipoEditorial){throw `El tipo de editorial ${id} no fue encontrado en los registros`}
        return this.repository.delete(new TipoEditorialId(id));
    }
}