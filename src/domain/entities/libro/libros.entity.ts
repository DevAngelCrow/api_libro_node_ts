import {
  LibroEdicion,
  LibroFechaPublicacion,
  LibroGeneroId,
  LibroId,
  LibroIdFormato,
  LibroIndiceId,
  LibroNombre,
  LibroPortada,
} from "../../valueObject";

export class Libro {
  private constructor(
    readonly id: LibroId,
    readonly nombre: LibroNombre,
    readonly fecha_publicacion: LibroFechaPublicacion,
    readonly id_genero: LibroGeneroId,
    readonly id_indice_libro: LibroIndiceId,
    readonly edicion: LibroEdicion,
    readonly portada: LibroPortada,
    readonly id_formato_libro: LibroIdFormato
  ) {}
}
