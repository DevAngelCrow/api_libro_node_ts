import {
  TipoEditorialEstado,
  TipoEditorialId,
  TipoEditorialNombreTipo,
} from "../../valueObject";

export class TipoEditorial {
  constructor(
    readonly nombre_tipo: TipoEditorialNombreTipo,
    readonly estado: TipoEditorialEstado,
    readonly id?: TipoEditorialId
  ) {}
}
