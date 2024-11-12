import { FormatoLibroEstado } from "../../valueObject/formatoLibroValueObject/formatoLibroEstado.value.object";
import { FormatoLibroFormato } from "../../valueObject/formatoLibroValueObject/formatoLibroFormato.value.object";
import { FormatoLibroId } from "../../valueObject/formatoLibroValueObject/formatoLibroId.value.object";
import { FormatoLibroManufactura } from "../../valueObject/formatoLibroValueObject/formatoLibroManufactura.value.object";

export class FormatoLibro{
    constructor(
        readonly formato: FormatoLibroFormato,
        readonly manufactura: FormatoLibroManufactura,
        readonly estado: FormatoLibroEstado,
        readonly id?: FormatoLibroId,
    ){}
}