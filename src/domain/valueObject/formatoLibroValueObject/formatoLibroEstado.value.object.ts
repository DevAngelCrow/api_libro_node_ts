import { CustomError } from "../../errors/custom.error";

export class FormatoLibroEstado {
    constructor(readonly value: boolean){
        this.required();
    }
    private required(){
        console.log(typeof this.value)
        if(!this.value &&  typeof this.value !== "boolean"){
            throw CustomError.badRequest("El campo estado es obligatorio")
        }
    }
}