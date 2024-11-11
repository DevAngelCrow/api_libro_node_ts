import { PrismaClient } from "@prisma/client";
import { Libro } from "../../../domain/entities/libro/libros.entity";
import { LibroRepository } from "../../../domain/repositories/libro/LibroRepository";
import { LibroId } from "../../../domain/valueObject";
import { ConvertToPrismaData } from "./converToPrismaData";
import { CustomError } from "../../../domain";

export class ImplLibroRepository implements LibroRepository {
  private libros: Libro[] = [];

  private prisma = new PrismaClient();

  async create(libro: Libro): Promise<void> {
    try {
      await this.prisma.mnt_libro.create({
        data: new ConvertToPrismaData().mntLibroToPrisma(libro),
      });
    } catch (error) {
      throw CustomError.internalServer("Error interno del servidor");
    }
  }
  async getAll(): Promise<Libro[]> {
    return this.libros;
  }
  async getOneById(id: LibroId): Promise<Libro | null> {
    return this.libros.find((libro) => libro.id.value === id.value) || null;
  }
  async update(libro: Libro): Promise<void> {
    const { id } = libro;

    try {
      // if (isNaN(id.value)) {
      //   throw CustomError.badRequest("Id de ser de tipo numerico");
      // }
      const prismaElement = new ConvertToPrismaData().mntLibroToPrisma(libro);
      const libroExist = await this.prisma.mnt_libro.findUnique({
        where: {
          id: id.value,
        },
      });

      if (!libroExist) {
        throw CustomError.notFound("Id no encontrado");
      }

      await this.prisma.mnt_libro.update({
        where: {
          id: id.value,
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
    this.libros = this.libros.filter((libro) => libro.id.value !== id.value);
  }
}
