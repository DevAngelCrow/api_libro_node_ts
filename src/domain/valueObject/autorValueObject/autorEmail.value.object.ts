import { CustomError } from "../..";

export class AutorEmail{
    constructor(readonly value: string){
        this.required();
    }
    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo email es obligatorio");
        }

        const validMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(this.value);

        if(!validMail){
            throw CustomError.badRequest("El email proporcionado no contiene el formato estandar 'ejemplo@mail.com'");
        }

    }
}