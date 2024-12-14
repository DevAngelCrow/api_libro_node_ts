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
      mnt_libro_autor: {
        create: libro.autores?.value.map((autor) => ({
          mnt_autor: { connect: { id: +autor } },
        })),
      },
      mnt_libro_editorial: {
        create: libro.editoriales?.value.map((editorial) => ({
          mnt_editorial: { connect: { id: +editorial } },
        })),
      },
      mnt_libro_idioma: {
        create: libro.idiomas?.value.map((idioma) => ({
          ctl_idioma: { connect: { id: +idioma } }
        }))
      }
    };
  }
}
