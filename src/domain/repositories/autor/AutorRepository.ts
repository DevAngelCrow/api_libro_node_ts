import { Autor } from "../../entities";
import { AutorId } from "../../valueObject";

export interface AutorRepository{
    create(autor: Autor) : Promise<void>;
    getAll() : Promise<Autor[]>;
    getOneById(id: AutorId) : Promise<Autor | null>;
    update(autor: Autor) : Promise<void>
    delete(id: AutorId) : Promise<void>
}