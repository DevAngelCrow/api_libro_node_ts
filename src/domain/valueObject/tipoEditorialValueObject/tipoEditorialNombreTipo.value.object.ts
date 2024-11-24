import { CustomError } from "../..";

export class TipoEditorialNombreTipo{
    constructor(readonly value: string){
        this.required();
    }
    private required() {
        if (!this.value) {
          throw CustomError.badRequest("El campo nombre tipo es obligatorio");
        }
      }
}