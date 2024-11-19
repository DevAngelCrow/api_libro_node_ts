import { Pais } from "../../entities";
import { PaisId } from "../../valueObject";

export interface PaisRepository{
    create(pais: Pais):Promise<void>;
    update(pais: Pais):Promise<void>;
    getAll():Promise<Pais[]>;
    getOneById(id: PaisId):Promise<Pais | null>;
    delete(id: PaisId):Promise<void>
}