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
import drive from "../../config/googleDrive";
import { Readable } from "stream";
import fs from 'fs'

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
    try{
      const librosBd = await this.prisma.mnt_libro.findMany({
        include:{
          ctl_formato_libro: true,
          ctl_genero: true,
          ctl_idioma: true,
        } 
      });
     
      
      this.libros = librosBd.map((libro)=>{ return this.mapToDomain(libro)})
      return this.libros;
    }catch(error){
      throw CustomError.internalServer('Error interno del servidor')
      
    }
  }
  async getOneById(id: LibroId): Promise<Libro | null> {
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
      throw CustomError.internalServer('Error interno del servidor');
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

  async createUrlPortada(portada: Express.Multer.File): Promise<LibroPortada> {
    try{
      
      
      const { buffer, originalname, mimetype } = portada;
      
      const folderId = [];
      folderId.push(process.env.FOLDER_ID!);
      const stream = Readable.from(buffer);
      const requestBody = {
        name: originalname,
        parents: [process.env.FOLDER_ID!],
      };
      const media = {
        mimeType: mimetype,
        body: stream,
      }

      const urlPortada = await drive.files.create({
        requestBody: requestBody,
        media,
        fields: 'id',
      });

      const fileId = urlPortada.data.id;
      await drive.permissions.create({
        fileId: fileId!,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });
      const imageUrl = `https://drive.google.com/uc?id=${fileId}`;
      return new LibroPortada(imageUrl); 
    }catch(error){
      throw CustomError.internalServer('Error en la peticion de google Drive');
    }
  }

  async getImgPortada(urlPortada: string): Promise<Buffer> {
    try {
      const imgFile  = await drive.files.get(
        {fileId: urlPortada, alt:'media'},
        { responseType: 'stream'}
      );
      const valorStream : Buffer  = await this.readStream(imgFile.data);
      return valorStream;
    } catch (error) {
      throw error
    }
    
  }

  private readStream(stream: Readable) : Promise<Buffer>{
    let data : Buffer[] = []
      return new Promise((resolve, reject) => {
        stream.on('data', (chunk: Buffer) => {
          data.push(chunk);
        })
        .on('end', () => {
          const buffer = Buffer.concat(data);
          resolve(buffer);
        })
        .on('error', (err : Error) =>{
          reject(err)
        })
      })
      
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
