import { CustomError } from "../../errors/custom.error";
export class LibroIdiomas{
    constructor(readonly value: Array<number>){
        // this.required();
        // this.idIdiomaNumberValid();
    }

//     private idIdiomaNumberValid() {
//     if (isNaN(this.value)) {
//       throw CustomError.badRequest(`El valor del id no es valido ${this.value}`);
//     }
//     if (this.value < 0) {
//       throw CustomError.badRequest(`El valor no puede ser menor a 0 ${this.value}`);
//     }
//   }

//   private required() {
//     if (!this.value) {
//       throw CustomError.badRequest(
//         "El campo id_idioma es requerido"
//       );
//     }
//   }
}