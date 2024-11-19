import { Prisma, PrismaClient } from "@prisma/client";
import { Editorial, Pais, TipoEditorial } from "../../../domain/entities";
import { EditorialRepository } from "../../../domain/repositories";
import {
  EditorialAnioFundacion,
  EditorialDireccion,
  EditorialEstado,
  EditorialId,
  EditorialIdPais,
  EditorialIdTipoEditorial,
  EditorialNombre,
  EditorialSitioWeb,
  EditorialTelefono,
  PaisAbreviacion,
  PaisCodigo,
  PaisEstado,
  PaisId,
  PaisNombre,
  TipoEditorialEstado,
  TipoEditorialId,
  TipoEditorialNombreTipo,
} from "../../../domain/valueObject";
import { CustomError } from "../../../domain";
import { ConvertToPrismaData } from "./converToPrismaData";
import { where } from "sequelize";
type PostgresEditorial = {
  id: number;
  nombre: string;
  direccion: string;
  anio_fundacion: string;
  id_pais: number;
  id_tipo_editorial: number;
  telefono: string;
  estado: boolean;
  sitio_web?: string | null;
  ctl_pais?: {
    [key: string]: any;
  };
  ctl_tipo_editorial?: {
    [key: string]: any;
  };
};
export class ImplEditorialRepository implements EditorialRepository {
  private editoriales: Editorial[] = [];
  private prisma = new PrismaClient();

  async create(editorial: Editorial): Promise<void> {
    try {
      const editorialDataPrisma =
        new ConvertToPrismaData().mntEditorialToPrisma(editorial);
      await this.prisma.mnt_editorial.create({
        data: editorialDataPrisma,
      });
    } catch (error) {
      throw CustomError.internalServer("Error interno del servidor");
    }
  }
  async getAll(): Promise<Editorial[]> {
    try {
      const editoriales = await this.prisma.mnt_editorial.findMany({
        select: {
          id: true,
          nombre: true,
          direccion: true,
          anio_fundacion: true,
          id_pais: true,
          id_tipo_editorial: true,
          sitio_web: true,
          telefono: true,
          estado: true,
          ctl_pais: true,
          ctl_tipo_editorial: true,
        },
      });

      this.editoriales = editoriales.map((editorial) => {
        return this.mapToDomain(editorial);
      });

      return this.editoriales;
    } catch (error) {
      throw CustomError.internalServer("Error interno del servidor");
    }
  }
  async getOneById(id: EditorialId): Promise<Editorial | null> {
    try {
      const editorial = await this.prisma.mnt_editorial.findUnique({
        where: {
          id: id.value,
        },
        select: {
          id: true,
          nombre: true,
          direccion: true,
          anio_fundacion: true,
          ctl_pais: true,
          id_pais: true,
          id_tipo_editorial: true,
          ctl_tipo_editorial: true,
          sitio_web: true,
          telefono: true,
          estado: true,
        },
      });

      if (!editorial) {
        return null;
      }

      return this.mapToDomain(editorial);
    } catch (error) {
      throw CustomError.internalServer("Error interno del servidor");
    }
  }
  async update(editorial: Editorial): Promise<void> {
    try {
      const { id } = editorial;

      await this.prisma.$transaction(async (tx) => {
        await tx.mnt_editorial.update({
          where: {
            id: id?.value,
          },
          data: {
            nombre: editorial.nombre.value,
            direccion: editorial.direccion.value,
            anio_fundacion: editorial.anio_fundacion.value,
            id_pais: editorial.id_pais.value,
            id_tipo_editorial: editorial.id_tipo_editorial.value,
            sitio_web: editorial.sitio_web?.value,
            telefono: editorial.telefono.value,
            estado: editorial.estado.value,
            updated_at: new Date(Date.now()),
          },
        });

        await this.updateEditorialLibro(
          tx,
          editorial.libros?.value!,
          id?.value!
        );
      });
    } catch (error) {
      throw CustomError.internalServer("Error interno del servidor");
    }
  }

  async updateEditorialLibro(
    tx: Prisma.TransactionClient,
    idLibros: Array<number>,
    id: number
  ) {
    try {
      const libros = await tx.mnt_libro_editorial.findMany({
        where: {
          id_editorial: id,
        },
        select: {
          id: true,
          id_editorial: true,
          id_libro: true,
          estado: true,
        },
      });

      const idsExistentes = new Set(libros.map((libro) => libro.id_editorial));

      const librosDesactivar = libros.filter(
        (libro) => !idLibros.includes(libro.id_libro)
      );

      const librosReactivar = libros.filter(
        (libro) => idLibros.includes(libro.id_libro) && libro.estado === false
      );

      const librosNuevos = idLibros.filter(
        (idLibro) => !idsExistentes.has(idLibro)
      );

      if (librosDesactivar.length) {
        await tx.mnt_libro_editorial.updateMany({
          where: {
            id_editorial: id,
            id_libro: { in: librosDesactivar.map((libro) => libro.id_libro) },
          },
          data: {
            estado: false,
            updated_at: new Date(Date.now()),
          },
        });
      }

      if (librosReactivar.length) {
        await tx.mnt_libro_editorial.updateMany({
          where: {
            id_editorial: id,
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
          id_editorial: id,
          id_libro: idLibro,
          estado: true,
        }));
        await tx.mnt_libro_editorial.createMany({
          data: nuevosRegistros,
        });
      }
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw CustomError.internalServer(
          "Error interno en la actualizacion de la editorial"
        );
      }
    }
  }
  async delete(id: EditorialId): Promise<void> {
    try {
      await this.prisma.mnt_editorial.update({
        where: {
          id: id.value,
        },
        data: {
          estado: false,
        },
      });
    } catch (error) {
      throw CustomError.internalServer(
        "Error interno en la eliminación de la editorial"
      );
    }
  }

  private mapToDomain(editorial: PostgresEditorial): Editorial {
    return new Editorial(
      new EditorialNombre(editorial.nombre),
      new EditorialDireccion(editorial.direccion),
      new EditorialAnioFundacion(editorial.anio_fundacion),
      new EditorialIdPais(editorial.id_pais),
      new EditorialIdTipoEditorial(editorial.id_tipo_editorial),
      new EditorialTelefono(editorial.telefono),
      new EditorialEstado(editorial.estado),
      new EditorialId(editorial.id),
      new EditorialSitioWeb(editorial.sitio_web!),
      undefined,
      new Pais(
        new PaisNombre(editorial.ctl_pais?.nombre!),
        new PaisAbreviacion(editorial.ctl_pais?.abreviacion!),
        new PaisCodigo(editorial.ctl_pais?.codigo!),
        new PaisEstado(editorial.ctl_pais?.estado!),
        new PaisId(editorial.ctl_pais?.id!)
      ),
      new TipoEditorial(
        new TipoEditorialNombreTipo(editorial.ctl_tipo_editorial?.nombre_tipo!),
        new TipoEditorialEstado(editorial.ctl_tipo_editorial?.estado!),
        new TipoEditorialId(editorial.ctl_tipo_editorial?.id!)
      )
    );
  }
}
