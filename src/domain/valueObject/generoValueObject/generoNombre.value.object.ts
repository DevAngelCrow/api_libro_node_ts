import { CustomError } from "../../errors/custom.error";

export class GeneroNombre{
    constructor(readonly value: string){
        this.required();
    }
    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo nombre es obligatorio")
        }
    }
}