import { Libro } from "../../../../domain/entities/libro/libros.entity";
import { LibroRepository } from "../../../../domain/repositories/libro/LibroRepository";
import {
  LibroEdicion,
  LibroEstado,
  LibroFechaPublicacion,
  LibroGeneroId,
  LibroId,
  LibroIdFormato,
  LibroNombre,
  LibroPortada,
  LibroIdIdioma,
  LibroResumen,
  LibroNumeroPaginas
} from "../../../../domain/valueObject";

export class LibroEdit {
  constructor(private repository: LibroRepository) {}

  async run(
    id: number,
    nombre: string,
    fecha_publicacion: Date,
    id_genero: number,
    edicion: string,
    portada: string,
    id_formato_libro: number,
    estado: boolean,
    id_idioma: number,
    resumen: string,
    numero_paginas: number,
  ) : Promise<void> {
    const libro = new Libro(
      new LibroId(id),
      new LibroNombre(nombre),
      new LibroFechaPublicacion(fecha_publicacion),
      new LibroGeneroId(id_genero),
      new LibroEdicion(edicion),
      new LibroPortada(portada),
      new LibroIdFormato(id_formato_libro),
      new LibroIdIdioma(id_idioma),
      new LibroResumen(resumen),
      new LibroNumeroPaginas(numero_paginas),
      new LibroEstado(estado),
    );

    return this.repository.update(libro);
  }
}
