export class LibroIdFormato {
  constructor(private readonly value: number) {
    this.idFormatoIsNumberValid();
  }

  private idFormatoIsNumberValid() {
    if (isNaN(this.value)) {
      throw new Error("El valor del id no es valido");
    }
    if (this.value < 0) {
      throw new Error("El valor no puede ser menor a 0");
    }
  }
}
