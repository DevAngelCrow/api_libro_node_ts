import { CustomError } from "../../errors/custom.error";

export class LibroEstado {
  constructor(readonly value: boolean) {
    this.required();
    this.isBoolean();
  }

  private isBoolean() {
    if (this.value) {
      if (typeof this.value !== "boolean") {
        throw CustomError.badRequest("El estado debe ser tipo booleano");
      }
    }
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("El campo estado es requerido");
    }
  }
}
