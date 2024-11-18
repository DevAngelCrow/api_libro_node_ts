import { Editorial } from "../../entities";
import { EditorialId } from "../../valueObject";

export interface EditorialRepository {
    create(editorial: Editorial):Promise<void>;
    getAll():Promise<Editorial[]>;
    getOneById(id: EditorialId):Promise<Editorial | null>;
    update(editorial: Editorial):Promise<void>;
    delete(id: EditorialId):Promise<void>
}