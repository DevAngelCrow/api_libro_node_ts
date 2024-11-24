import { CustomError } from "../../errors/custom.error";

export class IdiomaIdioma {
    constructor(
        readonly value: string
    ){
        this.required();
    }
    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo idioma es obligatorio")
        }
    }
}