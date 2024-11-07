export class LibroIndiceId{
    constructor(
        private readonly value: number){
            this.idIndiceIsNumberValid();
        }

    private idIndiceIsNumberValid(){
        if(isNaN(this.value)){
            throw new Error("El valor del id no es valido");
        }
        if(this.value < 0){
            throw new Error("El valor no puede ser menor a 0");
        }
    }
}