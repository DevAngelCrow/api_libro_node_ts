import {
  IdiomaAbreviatura,
  IdiomaId,
  IdiomaIdioma,
  IdiomaRegion,
  IdiomaEstado,
} from "../../valueObject/index";

export class Idioma {
  constructor(
    readonly idioma: IdiomaIdioma,
    readonly abreviatura: IdiomaAbreviatura,
    readonly region: IdiomaRegion,
    readonly estado: IdiomaEstado,
    readonly id?: IdiomaId,
  ) {}

  public mapToPrimitives(){
    return {
      id: this.id?.value,
      idioma: this.idioma.value,
      abreviatura: this.abreviatura.value,
      region: this.region?.value,
      estado: this.estado.value,

    }
  }
}
