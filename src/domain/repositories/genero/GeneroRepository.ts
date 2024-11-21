import { Genero } from "../../entities";
import { GeneroId } from "../../valueObject";

export interface GeneroRepository{
    create(genero: Genero):Promise<void>;
    update(genero: Genero):Promise<void>;
    getAll():Promise<Genero[]>;
    getOneById(id: GeneroId):Promise<Genero | null>;
    delete(id: GeneroId):Promise<void>
}