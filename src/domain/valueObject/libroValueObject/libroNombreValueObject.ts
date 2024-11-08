export class LibroNombre{
    constructor(
      readonly value: string,
    ){
        this.isMaxlengthValid()
    }

    private isMaxlengthValid(){
        if((this.value.length < 3)){
            throw new Error("El nombre debe tener al menos 3 o mas caracteres");
        }
    }
}