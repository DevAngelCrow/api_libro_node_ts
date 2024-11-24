import { CustomError } from "../..";

export class PaisNombre{
    constructor(readonly value:string){
        this.required();
    }
    private required() {
        if (!this.value) {
          throw CustomError.badRequest("El campo nombre es obligatorio");
        }
      }
}