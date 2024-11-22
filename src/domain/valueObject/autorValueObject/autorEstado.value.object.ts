import { CustomError } from "../..";

export class AutorEstado{
    constructor(readonly value: boolean){
        this.required();
    }

    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo de apellidos es obligatorio")
        }
    }
}