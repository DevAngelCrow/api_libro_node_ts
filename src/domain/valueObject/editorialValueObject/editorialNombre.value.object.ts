import { CustomError } from "../..";

export class EditorialNombre{
    constructor(readonly value: string){
        this.required();
    }
    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo nombre es obligatorio")
        }
    }
}