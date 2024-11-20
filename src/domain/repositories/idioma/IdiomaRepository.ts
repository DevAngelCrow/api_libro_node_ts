import { Idioma } from "../../entities";
import { IdiomaId } from "../../valueObject";

export interface IdiomaRepository {
    create(idioma: Idioma):Promise<void>;
    update(idioma: Idioma):Promise<void>;
    getAll():Promise<Idioma[]>;
    getOneById(id: IdiomaId):Promise<Idioma | null>;
    delete(id: IdiomaId):Promise<void>;
}