
import { Libro } from "../../../../domain/entities/libro/libros.entity";
import { LibroRepository } from "../../../../domain/repositories/index";
import {
  LibroEdicion,
  LibroEstado,
  LibroFechaPublicacion,
  LibroGeneroId,
  LibroIdFormato,
  LibroIdIdioma,
  LibroNombre,
  LibroNumeroPaginas,
  LibroPortada,
  LibroResumen,
} from "../../../../domain/valueObject";

export class LibroCreate {
  constructor(private repository: LibroRepository) {}

  async run(
    nombre: string,
    fecha_publicacion: Date,
    id_genero: number,
    edicion: string,
    portada: Express.Multer.File,
    id_formato_libro: number,
    id_idioma: number,
    resumen: string,
    numero_paginas: number,
    estado: boolean,
  ): Promise<void> {
    
    const urlImagenPortada = await this.repository.createUrlPortada(portada)
    
    if(typeof estado === 'string' && estado === 'true'){
      estado = true;
    }else{ estado = false}

    const libro = new Libro(
      new LibroNombre(nombre),
      new LibroFechaPublicacion(fecha_publicacion),
      new LibroGeneroId(id_genero),
      new LibroEdicion(edicion),
      new LibroPortada(urlImagenPortada?.value!),
      new LibroIdFormato(id_formato_libro),
      new LibroIdIdioma(id_idioma),
      new LibroResumen(resumen),
      new LibroNumeroPaginas(numero_paginas),
      new LibroEstado(estado),
    );

    

    return this.repository.create(libro);
  }
}
