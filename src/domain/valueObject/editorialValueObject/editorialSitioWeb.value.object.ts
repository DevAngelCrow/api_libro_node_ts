import { CustomError } from "../..";

export class EditorialSitioWeb{
    constructor(readonly value: string){
        this.required();
    }

    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo sitio web es obligatorio")
        }
    }
}