import { CustomError } from "../..";

export class EditorialTelefono{
    constructor(readonly value: string){
        this.required();
    }

    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo telefono es obligatorio")
        }
    }
}