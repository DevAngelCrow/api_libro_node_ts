import { CustomError } from "../..";

export class PaisAbreviacion {
  constructor(readonly value: string) {
    this.required();
  }
  private required() {
    if (!this.value) {
      throw CustomError.badRequest("El campo abreviación es obligatorio");
    }
  }
}
