import { CustomError } from "../../errors/custom.error";

export class IdiomaRegion {
  constructor(readonly value: string) {
    this.required();
  }
  private required() {
    if (!this.value) {
      throw CustomError.badRequest("El campo región es obligatorio");
    }
  }
}
