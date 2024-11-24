import { CustomError } from "../../errors/custom.error";

export class GeneroDescripcion {
  constructor(readonly value: string) {
    this.required();
  }
  private required() {
    if (!this.value) {
      throw CustomError.badRequest("El campo descripción es obligatorio");
    }
  }
}
