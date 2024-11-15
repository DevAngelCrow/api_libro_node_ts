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
  LibroNumeroPaginas,
  LibroPortadaMultimedia
} from "../../valueObject";
import { DateTime } from "luxon";
import { Genero } from "../genero/genero.entity";
import { FormatoLibro } from "../formato_libro/formatoLibro.entity";
import { Idioma } from "../idioma/idioma.entity";
export class Libro {
  constructor(
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
    readonly ctl_genero?: Genero,
    readonly ctl_formato_libro?: FormatoLibro,
    readonly ctl_idioma?: Idioma,
    readonly id?: LibroId,
    readonly portada_multimedia?: LibroPortadaMultimedia
  ) {
  }

  public mapToPrimitives(){
    const fecha = DateTime.fromJSDate(this.fecha_publicacion.value);
    return {
    id: this.id?.value,
    nombre: this.nombre.value,
    fecha_publicacion: fecha.toFormat('dd-MM-yyyy'),
    ctl_genero: this.mapToPrimitivesGenero(),
    edicion: this.edicion.value,
    portada: this.portada.value,
    ctl_formato_libro: this.mapToPrimitivesFormatoLibro(),
    ctl_idioma: this.mapToPrimitivesIdioma(),
    resumen: this.resumen.value,
    numero_paginas: this.numero_paginas.value,
    estado: this.estado?.value,
    portada_multimedia: this.portada_multimedia?.value 
    }
  }

  public mapToPrimitivesFormatoLibro(){
    return {
      formato: this.ctl_formato_libro?.formato.value,
      manufactura: this.ctl_formato_libro?.manufactura.value,
      estado: this.ctl_formato_libro?.estado.value,
      id: this.ctl_formato_libro?.id?.value,
    }
  }

  public mapToPrimitivesIdioma(){
    return {
      id: this.ctl_idioma?.id?.value,
      idioma: this.ctl_idioma?.idioma.value,
      abreviatura: this.ctl_idioma?.abreviatura.value,
      region: this.ctl_idioma?.region.value,
      estado: this.ctl_idioma?.estado.value
    }
  }

  public mapToPrimitivesGenero(){
    return {
      id: this.ctl_genero?.id?.value,
      nombre: this.ctl_genero?.nombre.value,
      descripcion: this.ctl_genero?.descripcion.value,
      estado: this.ctl_genero?.estado.value,
    }
  }
}
