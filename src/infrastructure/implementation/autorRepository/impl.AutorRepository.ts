import { Prisma, PrismaClient } from "@prisma/client";
import { Autor, Pais } from "../../../domain/entities";
import { AutorRepository } from "../../../domain/repositories";
import {
  AutorApellidos,
  AutorEmail,
  AutorEstado,
  AutorFechaNacimiento,
  AutorId,
  AutorIdNacionalidad,
  AutorNombres,
  AutorTelefono,
  PaisAbreviacion,
  PaisCodigo,
  PaisEstado,
  PaisId,
  PaisNombre,
} from "../../../domain/valueObject";
import { CustomError } from "../../../domain";
import { ConvertToPrismaData } from "./converToPrismaData";

type PostgresAutor = {
  id: number;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: Date;
  id_nacionalidad: number;
  telefono: string;
  email: string;
  estado: boolean;
  ctl_pais?: { [key: string]: any };
};

export class ImplAutorRepository implements AutorRepository {
  private autores: Autor[] = [];
  private prisma: PrismaClient = new PrismaClient();

  async create(autor: Autor): Promise<void> {
    try {
      const prismaValues = new ConvertToPrismaData().mntAutorToPrisma(autor);

      await this.prisma.mnt_autor.create({
        data: prismaValues,
      });
    } catch (error) {
      throw CustomError.internalServer("Error interno del servidor");
    }
  }
  async getAll(): Promise<Autor[]> {
    try {
      const autores = await this.prisma.mnt_autor.findMany({
        select: {
          ctl_pais: true,
          id: true,
          nombres: true,
          apellidos: true,
          fecha_nacimiento: true,
          id_nacionalidad: true,
          telefono: true,
          email: true,
          estado: true,
        },
        orderBy: {
          id: 'asc'
        }
      });

      this.autores = autores.map((autor) => this.mapToDomain(autor));

      return this.autores;
    } catch (error) {
      throw CustomError.internalServer("Error interno en el servidor");
    }
  }
  async getOneById(id: AutorId): Promise<Autor | null> {
    try {
      const autor = await this.prisma.mnt_autor.findUnique({
        where: {
          id: id.value,
        },
        select: {
          ctl_pais: true,
          id: true,
          nombres: true,
          apellidos: true,
          fecha_nacimiento: true,
          telefono: true,
          email: true,
          estado: true,
          id_nacionalidad: true,
        },
      });

      if (!autor) {
        return null;
      }

      return this.mapToDomain(autor);
    } catch (error) {
      throw CustomError.internalServer("Error interno en el servidor");
    }
  }
  async update(autor: Autor): Promise<void> {
    try {
      const { id } = autor;
      await this.prisma.$transaction(async (tx) => {
        await tx.mnt_autor.update({
          where: {
            id: id?.value,
          },
          data: {
            nombres: autor.nombres.value,
            apellidos: autor.apellidos.value,
            fecha_nacimiento: autor.fecha_nacimiento.value,
            id_nacionalidad: autor.id_nacionalidad.value,
            telefono: autor.telefono.value,
            email: autor.email.value,
            estado: true,
            updated_at: new Date(Date.now()),
          },
        });

        await this.updateLibroAutor(tx, id?.value!, autor.libros?.value!);
      });
    } catch (error) {
      throw CustomError.internalServer("Error interno en el servidor al actualizar el autor");
    }
  }
  async delete(id: AutorId): Promise<void> {
    try {
      await this.prisma.mnt_autor.update({
        where: {
          id: id.value,
        },
        data:{
          estado: false,
        }
      });
    } catch (error) {
      throw CustomError.internalServer("Error interno en el servidor al eliminar el autor")
    }
  }

  async findGroup(idAutores: Array<number>): Promise<Array<number> | null> {
    try {
      const idAutoresFormat = idAutores.map((id)=> +id);
      const autoresInexistentes = await this.prisma.$queryRaw<{[key:string]:any}[]>`WITH id_autores AS (SELECT UNNEST(ARRAY[${idAutoresFormat}]) AS ID)
      SELECT ID
      FROM id_autores
      EXCEPT
      SELECT id
      FROM mnt_autor`;

      const formatAutoresId = autoresInexistentes.map((autor) => autor.id);

      if(formatAutoresId.length){
        let cadena = "Los siguientes 'ids' de autores no existen en los registros de la base de datos";

        formatAutoresId.forEach((id)=> cadena += ` ${id} `);

        throw CustomError.badRequest(cadena);
      }
      return formatAutoresId;
    } catch (error) {
      throw error;
    }
  }

  async updateLibroAutor(
    tx: Prisma.TransactionClient,
    id: number,
    idLibros: Array<number>
  ) {
    try {
      const autores = await tx.mnt_libro_autor.findMany({
        where: {
          id_autor: id,
        },
        select: {
          id: true,
          id_libro: true,
          id_autor: true,
          estado: true,
        },
      });

      const idsExistentes = new Set(autores.map((autor) => autor.id_libro));

      const librosADesactivar = autores.filter(
        (autor) => !idLibros.includes(autor.id_libro)
      );

      const librosReactivar = autores.filter(
        (autor) => idLibros.includes(autor.id_libro) && autor.estado === false
      );

      const librosNuevos = idLibros.filter(
        (idLibro) => !idsExistentes.has(idLibro)
      );

      if (librosADesactivar.length) {
        await tx.mnt_libro_autor.updateMany({
          where: {
            id_autor: id,
            id_libro: { in: librosADesactivar.map((libro) => libro.id_libro) },
          },
          data: {
            estado: false,
            updated_at: new Date(Date.now()),
          },
        });
      }

      if (librosReactivar.length) {
        await tx.mnt_libro_autor.updateMany({
          where: {
            id_autor: id,
            id_libro: { in: librosReactivar.map((libro) => libro.id_libro) },
          },
          data: {
            estado: true,
            updated_at: new Date(Date.now()),
          },
        });
      }

      if (librosNuevos.length) {
        const nuevosRegistros = librosNuevos.map((idLibro) => ({
          id_autor: id,
          id_libro: idLibro,
          estado: true,
        }));
        await tx.mnt_libro_autor.createMany({
          data: nuevosRegistros,
        });
      }
    } catch (error) {
      throw CustomError.internalServer("Error interno en el servidor");
    }
  }

  private mapToDomain(autor: PostgresAutor): Autor {
    return new Autor(
      new AutorNombres(autor.nombres),
      new AutorApellidos(autor.apellidos),
      new AutorFechaNacimiento(autor.fecha_nacimiento),
      new AutorIdNacionalidad(autor.id_nacionalidad),
      new AutorTelefono(autor.telefono),
      new AutorEmail(autor.email),
      new AutorEstado(autor.estado),
      new AutorId(autor.id),
      new Pais(
        new PaisNombre(autor.ctl_pais?.nombre),
        new PaisAbreviacion(autor.ctl_pais?.abreviacion),
        new PaisCodigo(autor.ctl_pais?.codigo),
        new PaisEstado(autor.ctl_pais?.estado),
        new PaisId(autor.ctl_pais?.id)
      )
    );
  }
}
