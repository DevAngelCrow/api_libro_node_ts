import { Prisma } from "@prisma/client";
import { Libro } from "../../../domain/entities/libro/libros.entity";

export class ConvertToPrismaData {

  mntLibroToPrisma(libro: Libro): Prisma.mnt_libroCreateInput {
    
    return {
      nombre: libro.nombre.value,
      fecha_publicacion: libro.fecha_publicacion.value,
      edicion: libro.edicion.value,
      portada: libro.portada.value,
      resumen: libro.resumen.value,
      numero_paginas: libro.numero_paginas.value,
      ctl_formato_libro: { connect: { id: libro.id_formato_libro.value } },
      ctl_genero: { connect: { id: libro.id_genero.value } },
      ctl_idioma: { connect: {id: libro.id_idioma.value }},
    };
  }
}
