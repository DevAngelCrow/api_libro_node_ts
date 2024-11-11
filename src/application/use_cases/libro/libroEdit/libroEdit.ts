import { Libro } from "../../../../domain/entities/libro/libros.entity";
import { LibroRepository } from "../../../../domain/repositories/libro/LibroRepository";
import {
  LibroEdicion,
  LibroEstado,
  LibroFechaPublicacion,
  LibroGeneroId,
  LibroId,
  LibroIdFormato,
  LibroIndiceId,
  LibroNombre,
  LibroPortada,
} from "../../../../domain/valueObject";

export class LibroEdit {
  constructor(private repository: LibroRepository) {}

  async run(
    id: number,
    nombre: string,
    fecha_publicacion: Date,
    id_genero: number,
    id_indice_libro: number,
    edicion: string,
    portada: string,
    id_formato_libro: number,
    estado: boolean
  ) : Promise<void> {
    const libro = new Libro(
      new LibroId(id),
      new LibroNombre(nombre, true),
      new LibroFechaPublicacion(fecha_publicacion),
      new LibroGeneroId(id_genero),
      new LibroIndiceId(id_indice_libro),
      new LibroEdicion(edicion),
      new LibroPortada(portada),
      new LibroIdFormato(id_formato_libro),
      new LibroEstado(estado)
    );

    return this.repository.update(libro);
  }
}
