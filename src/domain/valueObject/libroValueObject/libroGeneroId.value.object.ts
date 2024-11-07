export class LibroGeneroId{
    constructor(
        private readonly value: number){
            this.idGeneroIsNumberValid();
        }

    private idGeneroIsNumberValid(){
        if(isNaN(this.value)){
            throw new Error("El valor del id no es valido");
        }
        if(this.value < 0){
            throw new Error("El valor no puede ser menor a 0");
        }
    }
}