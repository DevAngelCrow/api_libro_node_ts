import { CustomError } from "../../errors/custom.error";

export class LibroIdFormato {
  constructor( readonly value: number) {
    this.idFormatoIsNumberValid();
  }

  private idFormatoIsNumberValid() {
    if (isNaN(this.value)) {
      throw CustomError.badRequest(`El valor del id no es valido ${this.value} formato`);
    }
    if (this.value < 0) {
      throw CustomError.badRequest(`El valor no puede ser menor a 0 ${this.value} formato`);
    }
  }
}
