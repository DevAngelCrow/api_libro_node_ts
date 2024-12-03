import { AutorRepository } from "../../../../domain/repositories";

export class AutorFindGroup {
    constructor(private repository: AutorRepository){}

    async run(idAutores: Array<number>): Promise<Array<number> | null>{
        return this.repository.findGroup(idAutores)
    }
}