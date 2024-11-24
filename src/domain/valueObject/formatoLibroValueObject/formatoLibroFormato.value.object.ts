import { CustomError } from "../../errors/custom.error";

export class FormatoLibroFormato{
    constructor(readonly value: string){
        this.required();
    }
    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo formato es obligatorio")
        }
    }
}