import { CustomError } from "../../errors/custom.error";

export class LibroEdicion {
  constructor(readonly value: string) {
    this.required();
    this.isMaxlengthValid();
  }

  private isMaxlengthValid() {
    if (this.value.length < 3) {
      throw CustomError.badRequest(
        "La edicion debe tener al menos 3 o mas caracteres"
      );
    }
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("El campo edición es requerido");
    }
  }
}
