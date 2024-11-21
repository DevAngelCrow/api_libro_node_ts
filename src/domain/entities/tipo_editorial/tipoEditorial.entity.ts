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

  public mapToPrimitives(){
    return {
      id: this.id?.value,
      nombre_tipo: this.nombre_tipo.value,
      estado: this.estado.value,
    }
  }
}
