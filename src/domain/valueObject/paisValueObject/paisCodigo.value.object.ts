import { CustomError } from "../..";

export class PaisCodigo {
  constructor(readonly value: string) {
    this.required();
  }
  private required() {
    if (!this.value) {
      throw CustomError.badRequest("El campo código es obligatorio");
    }
  }
}
