import { CustomError } from "../../errors/custom.error";

export class LibroGeneroId {
  constructor(readonly value: number) {
    this.required();
    this.idGeneroIsNumberValid();
  }

  private idGeneroIsNumberValid() {
    if (isNaN(this.value)) {
      throw CustomError.badRequest(
        `El valor del id no es valido ${this.value} genero`
      );
    }
    if (this.value < 0) {
      throw CustomError.badRequest(
        `El valor no puede ser menor a 0 ${this.value} genero`
      );
    }
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest(
        "El campo id_genero es requerido"
      );
    }
  }
}
