import { DateTime } from "luxon";
import { CustomError } from "../../errors/custom.error";

export class LibroFechaPublicacion {
  constructor(readonly value: Date) {
    this.required();

    // this.isValidDate();
  }

  private isValidDate() {
    let fecha = this.value.toString();
    let dt = DateTime.fromFormat(fecha, "yyyy/MM/DD");

    if (dt.isValid) {
      throw new Error("El formato de la fecha debe ser YYYY/MM/DD");
    }
  }
  private required() {
    if (!this.value) {
      throw CustomError.badRequest(
        "El campo fecha de publicación es requerido"
      );
    }
  }
}
