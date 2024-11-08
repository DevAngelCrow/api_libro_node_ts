export class LibroIdFormato {
  constructor( readonly value: number) {
    this.idFormatoIsNumberValid();
  }

  private idFormatoIsNumberValid() {
    if (isNaN(this.value)) {
      throw new Error(`El valor del id no es valido ${this.value} formato`);
    }
    if (this.value < 0) {
      throw new Error(`El valor no puede ser menor a 0 ${this.value} formato`);
    }
  }
}
