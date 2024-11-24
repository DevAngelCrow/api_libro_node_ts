import { CustomError } from "../..";

export class EditorialDireccion{
    constructor(readonly value: string){
        this.required();
    }

    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo dirección es obligatorio")
        }
    }
}