import { CustomError } from "../..";

export class AutorNombres{
    constructor(readonly value: string){
        this.required();
    }
    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo de apellidos es obligatorio")
        }
    }
}