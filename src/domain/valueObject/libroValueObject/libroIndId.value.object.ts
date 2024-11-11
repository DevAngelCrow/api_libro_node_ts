import { CustomError } from "../../errors/custom.error";

export class LibroIndiceId{
    constructor(
         readonly value: number){
            this.idIndiceIsNumberValid();
        }

    private idIndiceIsNumberValid(){
        if(isNaN(this.value)){
            throw CustomError.badRequest(`El valor del id no es valido ${this.value} indice`);
        }
        if(this.value < 0){
            throw CustomError.badRequest(`El valor no puede ser menor a 0 ${this.value} indice`);
        }
    }
}