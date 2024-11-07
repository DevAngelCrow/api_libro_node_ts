export class LibroEdicion{
    constructor(
     private readonly value: string,
    ){
        this.isMaxlengthValid()
    }

    private isMaxlengthValid(){
        if(!(this.value.length < 3)){
            throw new Error("La edicion debe tener al menos 3 o mas caracteres");
        }
    }
}