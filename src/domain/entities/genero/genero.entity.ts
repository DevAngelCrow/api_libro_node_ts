import { GeneroDescripcion } from "../../valueObject/generoValueObject/generoDescripcion.value.object";
import { GeneroEstado } from "../../valueObject/generoValueObject/generoEstado.value.object";
import { GeneroId } from "../../valueObject/generoValueObject/generoId.value.object";
import { GeneroNombre } from "../../valueObject/generoValueObject/generoNombre.value.object";

export class Genero {
    constructor(
        readonly nombre: GeneroNombre,
        readonly descripcion: GeneroDescripcion,
        readonly estado: GeneroEstado,
        readonly id?: GeneroId,
    ){}
}