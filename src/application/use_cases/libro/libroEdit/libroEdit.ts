import { CustomError } from "../../../../domain";
import { Libro } from "../../../../domain/entities/libro/libros.entity";
import { LibroRepository } from "../../../../domain/repositories/index";
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
  LibroNumeroPaginas,
  LibroAutores,
  LibroEditoriales,
} from "../../../../domain/valueObject";
import { LibroPortadaMultimedia } from "../../../../domain/valueObject/libroValueObject/libroPortadaMultimedia.value.object";

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
    portada_multimedia: Buffer,
    autores: Array<number>,
    editoriales: Array<number>
  ): Promise<void> {
    const libro = new Libro(
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
      undefined,
      undefined,
      undefined,
      new LibroId(id),
      new LibroPortadaMultimedia(portada_multimedia),
      new LibroAutores(autores),
      new LibroEditoriales(editoriales)
    );

    const libroExist = await this.repository.getOneById(libro.id!);

    if (!libroExist) {
      throw CustomError.notFound("Libro no encontrado");
    }

    return this.repository.update(libro);
  }
}
