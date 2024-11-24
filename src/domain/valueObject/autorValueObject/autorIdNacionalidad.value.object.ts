import { CustomError } from "../..";

export class AutorIdNacionalidad{
    constructor(readonly value: number){
        this.required();
        this.idIsNumberValid();
    }
    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo de apellidos es obligatorio")
        }
    }
    private idIsNumberValid(){
        
        if(isNaN(this.value)){
            throw  CustomError.badRequest(`El valor del id no es válido`);
        }
        if(this.value < 0){
            throw CustomError.badRequest(`El valor no puede ser menor a 0 `);
        }
    
}
}