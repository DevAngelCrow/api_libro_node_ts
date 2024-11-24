import { CustomError } from "../../errors/custom.error";

export class GeneroEstado {
    constructor(readonly value: boolean){
        this.required();
    }
    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo estado es obligatorio")
        }
    }
}