import {
  LibroEdicion,
  LibroFechaPublicacion,
  LibroGeneroId,
  LibroId,
  LibroIdFormato,
  LibroNombre,
  LibroPortada,
  LibroEstado,
  LibroIdIdioma,
  LibroResumen,
  LibroNumeroPaginas
} from "../../valueObject";

export class Libro {
  constructor(
    readonly id: LibroId,
    readonly nombre: LibroNombre,
    readonly fecha_publicacion: LibroFechaPublicacion,
    readonly id_genero: LibroGeneroId,
    readonly edicion: LibroEdicion,
    readonly portada: LibroPortada,
    readonly id_formato_libro: LibroIdFormato,
    readonly id_idioma: LibroIdIdioma,
    readonly resumen: LibroResumen,
    readonly numero_paginas: LibroNumeroPaginas,
    readonly estado?: LibroEstado,
  ) {
  }

  public mapToPrimitives(){
    return {
    id: this.id.value,
    nombre: this.nombre.value,
    fecha_publicacion: this.fecha_publicacion.value,
    id_genero: this.id_genero.value,
    edicion: this.edicion.value,
    portada: this.portada.value,
    id_formato_libro: this.id_formato_libro.value,
    id_idioma: this.id_idioma.value,
    resumen: this.resumen.value,
    numero_paginas: this.numero_paginas.value,
    estado: this.estado?.value,
    }
  }
}
