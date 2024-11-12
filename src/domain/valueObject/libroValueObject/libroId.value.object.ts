import { CustomError } from "../../errors/custom.error";

export class LibroId{
    constructor(
         readonly value?: number){
            console.log(this.value, 'valor')
            this.idIsNumberValid();
        }

    private idIsNumberValid(){
        if(this.value){
            
            if(isNaN(this.value)){
                throw  CustomError.badRequest(`El valor del id no es valido`);
            }
            if(this.value < 0){
                throw CustomError.badRequest(`El valor no puede ser menor a 0 `);
            }
        }
    }
}