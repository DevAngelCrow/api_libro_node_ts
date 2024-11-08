export class LibroGeneroId{
    constructor(
         readonly value: number){
            this.idGeneroIsNumberValid();
        }

    private idGeneroIsNumberValid(){
        if(isNaN(this.value)){
            throw new Error(`El valor del id no es valido ${this.value} genero`);
        }
        if(this.value < 0){
            throw new Error(`El valor no puede ser menor a 0 ${this.value} genero`);
        }
    }
}