import { CustomError } from "../../errors/custom.error";

export class IdiomaAbreviatura {
  constructor(readonly value: string) {
    this.required();
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("El campo abreviatura es obligatorio");
    }
  }
}
