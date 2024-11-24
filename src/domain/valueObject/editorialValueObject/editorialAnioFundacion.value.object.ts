import { CustomError } from "../..";

export class EditorialAnioFundacion{
    constructor(readonly value: string){
        this.required();
    }
    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo año de fundacion es obligatorio")
        }
    }
}