import { PaisAbreviacion } from "../../valueObject/paisValueObject/paisAbreviacion.value.object";
import { PaisCodigo } from "../../valueObject/paisValueObject/paisCodigo.value.object";
import { PaisEstado } from "../../valueObject/paisValueObject/paisEstado.value.object";
import { PaisNombre } from "../../valueObject/paisValueObject/paisNombre.value.object";

export class Pais{
    constructor(
        readonly nombre: PaisNombre,
        readonly abreviacion: PaisAbreviacion,
        readonly codigo: PaisCodigo,
        readonly estado?: PaisEstado
    ){}
}