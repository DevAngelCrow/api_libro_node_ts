import { CustomError } from "../../../../domain";
import { Pais } from "../../../../domain/entities";
import { PaisRepository } from "../../../../domain/repositories";
import { PaisId } from "../../../../domain/valueObject";

export class PaisGetOneById{
    constructor(private repository: PaisRepository){}

    async run(id: number):Promise<Pais>{
       const pais = await this.repository.getOneById(new PaisId(id));

       if(!pais){
        throw CustomError.notFound("País no encontrado");
       }

       return pais;
    }
}