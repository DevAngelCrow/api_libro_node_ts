import { PrismaClient } from "@prisma/client";
import { Libro } from "../../../domain/entities/libro/libros.entity";
import { LibroRepository } from "../../../domain/repositories/libro/LibroRepository";
import {
  FormatoLibroEstado,
  FormatoLibroFormato,
  FormatoLibroId,
  FormatoLibroManufactura,
  GeneroDescripcion,
  GeneroEstado,
  GeneroId,
  GeneroNombre,
  IdiomaAbreviatura,
  IdiomaEstado,
  IdiomaId,
  IdiomaIdioma,
  IdiomaRegion,
  LibroEdicion,
  LibroEstado,
  LibroFechaPublicacion,
  LibroGeneroId,
  LibroId,
  LibroIdFormato,
  LibroIdIdioma,
  LibroNombre,
  LibroNumeroPaginas,
  LibroPortada,
  LibroResumen,
} from "../../../domain/valueObject";
import { ConvertToPrismaData } from "./converToPrismaData";
import { CustomError } from "../../../domain";
import { Genero } from "../../../domain/entities/genero/genero.entity";
import { FormatoLibro } from "../../../domain/entities/formato_libro/formatoLibro.entity";
import { Idioma } from "../../../domain/entities/idioma/idioma.entity";

type PostgresLibro = {
  id: number;
  nombre: string;
  fecha_publicacion: Date;
  id_genero: number;
  edicion: string;
  portada: string;
  id_formato_libro: number;
  id_idioma: number;
  resumen: string;
  numero_paginas: number;
  estado: boolean;
  ctl_formato_libro?: { [key: string]: any };
  ctl_genero?: { [key: string]: any };
  ctl_idioma?: { [key: string]: any };
};
export class ImplLibroRepository implements LibroRepository {
  private libros: Libro[] = [];

  private prisma = new PrismaClient();

  async create(libro: Libro): Promise<void> {
    try {
      const prismaData = new ConvertToPrismaData().mntLibroToPrisma(libro);
      await this.prisma.mnt_libro.create({
        data: prismaData,
      });
    } catch (error) {
      throw CustomError.internalServer("Error interno del servidor");
    }
  }
  async getAll(): Promise<Libro[]> {
    return this.libros;
  }
  async getOneById(id: LibroId): Promise<Libro | null> {
    console.log("console.log del getOneById");
    try {
      const libro = await this.prisma.mnt_libro.findUnique({
        where: {
          id: id.value,
        },
        include: {
          ctl_formato_libro: true,
          ctl_genero: true,
          ctl_idioma: true,
        },
      });

      if (!libro) {
        return null;
      }

      return this.mapToDomain(libro);
    } catch (error) {
      throw error;
    }
  }
  async update(libro: Libro): Promise<void> {
    const { id } = libro;

    try {
      const prismaElement = new ConvertToPrismaData().mntLibroToPrisma(libro);

      await this.prisma.mnt_libro.update({
        where: {
          id: id?.value,
        },
        data: {
          ...prismaElement,
        },
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw CustomError.internalServer(
          "Error interno en la actualizacion del libro"
        );
      }
    }
  }
  async delete(id: LibroId): Promise<void> {
    try {
      await this.prisma.mnt_libro.update({
        where: {
          id: id?.value,
        },
        data: {
          estado: false,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  private mapToDomain(libro: PostgresLibro): Libro {
    return new Libro(
      new LibroNombre(libro.nombre),
      new LibroFechaPublicacion(libro.fecha_publicacion),
      new LibroGeneroId(libro.id_genero),
      new LibroEdicion(libro.edicion),
      new LibroPortada(libro.portada),
      new LibroIdFormato(libro.id_formato_libro),
      new LibroIdIdioma(libro.id_idioma),
      new LibroResumen(libro.resumen),
      new LibroNumeroPaginas(libro.numero_paginas),
      new LibroEstado(libro.estado),
      new Genero(
        new GeneroNombre(libro?.ctl_genero?.nombre),
        new GeneroDescripcion(libro?.ctl_genero?.descripcion),
        new GeneroEstado(libro?.ctl_genero?.estado),
        new GeneroId(libro?.ctl_genero?.id)
      ),
      new FormatoLibro(
        new FormatoLibroFormato(libro?.ctl_formato_libro?.nombre),
        new FormatoLibroManufactura(libro?.ctl_formato_libro?.manufactura),
        new FormatoLibroEstado(libro?.ctl_formato_libro?.estado),
        new FormatoLibroId(libro?.ctl_formato_libro?.id)
      ),
      new Idioma(
        new IdiomaIdioma(libro?.ctl_idioma?.idioma),
        new IdiomaAbreviatura(libro?.ctl_genero?.abreviatura),
        new IdiomaRegion(libro?.ctl_genero?.region),
        new IdiomaEstado(libro?.ctl_genero?.estado),
        new IdiomaId(libro?.ctl_idioma?.id)
      ),
      new LibroId(libro.id)
    );
  }
}
