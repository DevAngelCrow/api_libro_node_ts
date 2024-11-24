import { CustomError } from "../..";

export class AutorLibros{
    constructor(readonly value: Array<number>){
        this.required();
    }
    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo de libros es obligatorio")
        }
    }
}