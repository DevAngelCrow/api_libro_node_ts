import { CustomError } from "../../errors/custom.error";

export class LibroNombre{
    constructor(
      readonly value: string,
    ){
        this.isMaxlengthValid()
    }

    private isMaxlengthValid(){
        if((this.value.length < 3)){
            throw CustomError.badRequest("El nombre debe tener al menos 3 o mas caracteres");
        }
    }
}