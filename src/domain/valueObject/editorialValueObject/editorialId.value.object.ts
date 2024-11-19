import { CustomError } from "../..";

export class EditorialId{
    constructor(readonly value: number){
        this.idIsNumberValid();
    }

    private idIsNumberValid(){
            if(isNaN(this.value)){
                throw  CustomError.badRequest(`El valor del id no es válido`);
            }
            if(this.value! < 0){
                throw CustomError.badRequest(`El valor no puede ser menor a 0 `);
            }
       
    }
}