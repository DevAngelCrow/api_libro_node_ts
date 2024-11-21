import { TipoEditorial } from "../../entities";
import { TipoEditorialId } from "../../valueObject";

export interface TipoEditorialRepository{
    create(tipoEditorial: TipoEditorial):Promise<void>;
    update(tipoEditorial: TipoEditorial):Promise<void>;
    getAll():Promise<TipoEditorial[]>;
    getOneById(id: TipoEditorialId):Promise<TipoEditorial | null>;
    delete(id: TipoEditorialId):Promise<void>
}