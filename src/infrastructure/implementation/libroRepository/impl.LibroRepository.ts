import { PrismaClient } from "@prisma/client";
import { Libro } from "../../../domain/entities/libro/libros.entity";
import { LibroRepository } from "../../../domain/repositories/libro/LibroRepository";
import { LibroEdicion, LibroEstado, LibroFechaPublicacion, LibroGeneroId, LibroId, LibroIdFormato, LibroIdIdioma, LibroNombre, LibroNumeroPaginas, LibroPortada, LibroResumen } from "../../../domain/valueObject";
import { ConvertToPrismaData } from "./converToPrismaData";
import { CustomError } from "../../../domain";


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
  estado: boolean,
  ctl_formato_libro?: {[key:string]:any},
  ctl_genero?: {[key:string]:any},
  ctl_idioma?: {[key:string]:any}
}
export class ImplLibroRepository implements LibroRepository {
  private libros: Libro[] = [];

  private prisma = new PrismaClient();

  async create(libro: Libro): Promise<void> {
    try {
      const prismaData = new ConvertToPrismaData().mntLibroToPrisma(libro);
      const newLibro = await this.prisma.mnt_libro.create({
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
    try{
      const libro = await this.prisma.mnt_libro.findUnique({
        where:{
          id: id.value,
        },
        include:{
          ctl_formato_libro: true,
          ctl_genero: true,
          ctl_idioma: true,
        }
      });
      
      console.log(libro, 'este es el libro')

      if(!libro){
        return null;
      }
      
      return this.mapToDomain(libro);
          

    }catch(error){
      throw error;
    }
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

  private mapToDomain(libro: PostgresLibro): Libro {

    return new Libro(
      new LibroId(libro.id),
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
    ); 
  }
}
