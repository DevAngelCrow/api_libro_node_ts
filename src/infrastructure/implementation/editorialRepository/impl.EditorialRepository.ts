import { PrismaClient } from "@prisma/client";
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
  getOneById(id: EditorialId): Promise<Editorial | null> {
    throw new Error("Method not implemented.");
  }
  update(editorial: Editorial): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: EditorialId): Promise<void> {
    throw new Error("Method not implemented.");
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
