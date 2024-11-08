export class LibroIndiceId{
    constructor(
         readonly value: number){
            this.idIndiceIsNumberValid();
        }

    private idIndiceIsNumberValid(){
        if(isNaN(this.value)){
            throw new Error(`El valor del id no es valido ${this.value} indice`);
        }
        if(this.value < 0){
            throw new Error(`El valor no puede ser menor a 0 ${this.value} indice`);
        }
    }
}