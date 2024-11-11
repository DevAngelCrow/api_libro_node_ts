import { CustomError } from "../../errors/custom.error";

export class LibroNombre{
    constructor(
      readonly value: string,
      private updateFlag: boolean = false,
    ){
        if(!this.updateFlag){
        this.noValue();
        }
        this.isMaxlengthValid();
        
    }

    private noValue(){
        if(!this.value){
            throw CustomError.badRequest("El campo nombre es obligatorio");
        }
    }
    private isMaxlengthValid(){
        if((this.value?.length < 3)){
            throw CustomError.badRequest("El nombre debe tener al menos 3 o mas caracteres");
        }
    }

    changeValidationFlag(validate: boolean){
        this.updateFlag = validate;
    }
}