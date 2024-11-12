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
}
