import { CustomError } from "../..";

export class EditorialLibros{
    constructor(readonly value: Array<number>){
        this.required();
    }
    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo libros es obligatorio")
        }
    }
}