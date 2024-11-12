import { CustomError } from "../../errors/custom.error";
export class LibroNumeroPaginas {
  constructor(readonly value: number) {
    this.required();
  }

  private numeroPaginaValid() {
    if (isNaN(this.value)) {
      throw CustomError.badRequest(
        `El número de página es válido ${this.value}`
      );
    }
    if (this.value < 0) {
      throw CustomError.badRequest(
        `El número de página no puede ser menor a 0 ${this.value}`
      );
    }
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("El campo numero_paginas es requerido");
    }
  }
}
