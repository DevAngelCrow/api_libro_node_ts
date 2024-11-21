import { FormatoLibro } from "../../entities";
import { FormatoLibroId } from "../../valueObject";

export interface FormatoLibroRepository{
    create(formatoLibro: FormatoLibro):Promise<void>;
    update(tipoEditorial: FormatoLibro):Promise<void>;
    getAll():Promise<FormatoLibro[]>;
    getOneById(id: FormatoLibroId):Promise<FormatoLibro | null>;
    delete(id: FormatoLibroId):Promise<void>
}