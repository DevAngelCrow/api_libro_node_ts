import { Prisma, PrismaClient } from "@prisma/client";
import { Autor, Pais } from "../../../domain/entities";
import { AutorRepository } from "../../../domain/repositories";
import { AutorApellidos, AutorEmail, AutorEstado, AutorFechaNacimiento, AutorId, AutorIdNacionalidad, AutorNombres, AutorTelefono, PaisAbreviacion, PaisCodigo, PaisEstado, PaisId, PaisNombre } from "../../../domain/valueObject";
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
  ctl_pais?: { [key: string]: any } 
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
    try{
      const autores = await this.prisma.mnt_autor.findMany(
        {
          include: {
            ctl_pais: true,
          }
        }
      );

      this.autores = autores.map((autor) => this.mapToDomain(autor))

      return this.autores;
    }catch(error){
      throw CustomError.internalServer("Error interno en el servidor")
    }
  }
  async getOneById(id: AutorId): Promise<Autor | null> {
    try{
      const autor = await this.prisma.mnt_autor.findUnique({
        where:{
          id: id.value,
        },
        include: {
          ctl_pais: true,
        }
      });

      if(!autor){
        return null;
      }

      return this.mapToDomain(autor);
    }catch(error){
      throw CustomError.internalServer("Error interno en el servidor")
    }
  }
  update(autor: Autor): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: AutorId): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private mapToDomain(autor: PostgresAutor) : Autor{
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
