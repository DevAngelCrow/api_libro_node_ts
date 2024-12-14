import { Libro } from "../../../../domain/entities/libro/libros.entity";
import {
  AutorRepository,
  LibroRepository,
} from "../../../../domain/repositories/index";
import {
  LibroAutores,
  LibroEdicion,
  LibroEditoriales,
  LibroEstado,
  LibroFechaPublicacion,
  LibroGeneroId,
  LibroIdFormato,
  LibroIdiomas,
  LibroNombre,
  LibroNumeroPaginas,
  LibroPortada,
  LibroResumen,
} from "../../../../domain/valueObject";

export class LibroCreate {
  constructor(
    private repository: LibroRepository,
    private repositoryAutor: AutorRepository
  ) {}

  async run(
    nombre: string,
    fecha_publicacion: Date,
    id_genero: number,
    edicion: string,
    portada: Express.Multer.File,
    id_formato_libro: number,
    resumen: string,
    numero_paginas: number,
    estado: boolean,
    autores: Array<number> = [],
    editoriales: Array<number> = [],
    idiomas: Array<number> = [],
  ): Promise<void> {
    await this.repositoryAutor.findGroup(autores);

    const urlImagenPortada = await this.repository.createUrlPortada(portada);
    if (typeof estado === "string" && estado === "true") {
      estado = true;
    } else {
      estado = false;
    }

    const libro = new Libro(
      new LibroNombre(nombre),
      new LibroFechaPublicacion(fecha_publicacion),
      new LibroGeneroId(id_genero),
      new LibroEdicion(edicion),
      new LibroPortada(urlImagenPortada?.value!),
      new LibroIdFormato(id_formato_libro),
      new LibroResumen(resumen),
      new LibroNumeroPaginas(numero_paginas),
      new LibroEstado(estado),
      undefined,
      undefined,
      undefined,
      undefined,
      new LibroAutores(autores),
      new LibroEditoriales(editoriales),
      new LibroIdiomas(idiomas)
    );

    return this.repository.create(libro);
  }
}
