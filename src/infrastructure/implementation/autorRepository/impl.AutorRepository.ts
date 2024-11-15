import { Prisma, PrismaClient } from "@prisma/client";
import { Autor } from "../../../domain/entities";
import { AutorRepository } from "../../../domain/repositories";
import { AutorId } from "../../../domain/valueObject";
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
};

export class ImplAutorRepository implements AutorRepository {
  private autor: Autor[] = [];
  private prisma: PrismaClient = new PrismaClient();

  async create(autor: Autor): Promise<void> {
    try {
      
      const prismaValues = new ConvertToPrismaData().mntAutorToPrisma(autor);

      await this.prisma.mnt_autor.create({
        data: prismaValues,
      });

    } catch (error) {
      console.log(error, 'error')
        throw CustomError.internalServer("Error interno del servidor");
    }
  }
  getAll(): Promise<Autor[]> {
    throw new Error("Method not implemented.");
  }
  getOneById(id: AutorId): Promise<Autor | null> {
    throw new Error("Method not implemented.");
  }
  update(autor: Autor): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: AutorId): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
