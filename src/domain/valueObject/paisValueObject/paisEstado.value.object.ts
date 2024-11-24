import { CustomError } from "../..";

export class PaisEstado{
    constructor(readonly value:boolean){
        this.required();
    }
    private required() {
        if (!this.value) {
          throw CustomError.badRequest("El campo estado es obligatorio");
        }
      }
}