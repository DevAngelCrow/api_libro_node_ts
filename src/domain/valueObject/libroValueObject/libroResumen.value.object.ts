import { CustomError } from "../../errors/custom.error";

export class LibroResumen{
    constructor(readonly value: string){
        this.required();
    }

    private required() {
        if (!this.value) {
          throw CustomError.badRequest(
            "El campo resumen es requerido"
          );
        }
      }
}