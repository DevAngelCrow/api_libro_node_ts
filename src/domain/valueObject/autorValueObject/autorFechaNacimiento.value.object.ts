import { CustomError } from "../..";

export class AutorFechaNacimiento{
    constructor(readonly value: Date){
        this.required();    
    }
    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo de apellidos es obligatorio")
        }
    }
}