import { CustomError } from "../../errors/custom.error";

export class LibroAutores{
    constructor(readonly value: Array<number>){
        this.required();
        this.verifyArray();
    }

    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo autores es requerido");
        }
    }

    private verifyArray(){
        if(!this.value.length){
            throw CustomError.badRequest("El libro debe tener al menos un autor");
        }
        this.value.forEach((id) => {
            if(+id === 0){
                throw CustomError.badRequest("El libro debe tener al menos un autor");
            }
        })
    }
}