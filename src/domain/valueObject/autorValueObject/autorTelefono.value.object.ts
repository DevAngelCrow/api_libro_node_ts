import { CustomError } from "../..";

export class AutorTelefono{
    constructor(readonly value: string){
        this.required();
    }
    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo de apellidos es obligatorio")
        }
    }
}