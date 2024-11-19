import {
  EditorialLibroEstado,
  EditorialLibroId,
  EditorialLibroIdEditorial,
  EditorialLibroIdLibro,
} from "../../valueObject";

export class EditorialLibro {
  constructor(
    readonly id_libro: EditorialLibroIdLibro,
    readonly id_editorial: EditorialLibroIdEditorial,
    readonly estado?: EditorialLibroEstado,
    readonly id?: EditorialLibroId
  ) {}
}
