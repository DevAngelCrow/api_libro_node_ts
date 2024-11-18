import { Prisma, PrismaClient } from "@prisma/client";
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
import { LibroPortadaMultimedia } from "../../../domain/valueObject/libroValueObject/libroPortadaMultimedia.value.object";

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

type AutorCreate = {
  id_libro: number;
  id_autor: number;
  existeAutor: boolean;
}[];

type AutoresUpdate = {
  id: number;
  id_libro: number;
  id_autor: number;
  existeAutor: boolean;
  estado: boolean;
}[];
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
    try {
      const librosBd = await this.prisma.mnt_libro.findMany({
        include: {
          ctl_formato_libro: true,
          ctl_genero: true,
          ctl_idioma: true,
        },
      });

      this.libros = librosBd.map((libro) => {
        return this.mapToDomain(libro);
      });
      return this.libros;
    } catch (error) {
      throw CustomError.internalServer("Error interno del servidor");
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

      const portadaBuffer = await this.getImgPortada(libro.portada);

      if (!portadaBuffer) {
        throw CustomError.internalServer(
          "Ocurrio un problema al obtener la imagen de Google Drive"
        );
      }

      return this.mapToDomain(libro, portadaBuffer);
    } catch (error) {
      throw CustomError.internalServer("Error interno del servidor");
    }
  }
  async update(libro: Libro): Promise<void> {
    const { id } = libro;

    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.mnt_libro.update({
          where: {
            id: id?.value,
          },
          data: {
            nombre: libro.nombre.value,
            fecha_publicacion: libro.fecha_publicacion.value,
            edicion: libro.edicion.value,
            portada: libro.portada.value,
            resumen: libro.resumen.value,
            numero_paginas: libro.numero_paginas.value,
            ctl_formato_libro: {
              connect: { id: libro.id_formato_libro.value },
            },
            ctl_genero: { connect: { id: libro.id_genero.value } },
            ctl_idioma: { connect: { id: libro.id_idioma.value } },
          },
        });

        await this.updateLibroAutor(tx, id?.value!, libro.autores?.value!);
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

  async updateLibroAutor(
    tx: Prisma.TransactionClient,
    id: number,
    idAutores: Array<number>
  ) {
    try {
      const libros = await tx.mnt_libro_autor.findMany({
        where: {
          id_libro: id,
        },
      });

      //este arreglo almacenara los autores que nunca han sido asociados a un libro.
      const autoresNuevos: AutorCreate = [];

      //este arreglo almacenara los autores que se actualizaran en la consulta
      const autoresActualizar: AutoresUpdate = [];

      //comparamos que cada uno de los id del arreglo de idAutores si existan en los id de la consulta
      //del libro en consideracion, si no, pues este sera creado
      //ya que nunca ha sido asociado a este libro en consideracion y los pushamos al arreglo de autoresNuevos

      idAutores.forEach((id_autor) => {
        const existe = libros.some((autor) => autor.id_autor === id_autor);
        if (!existe) {
          autoresNuevos.push({
            id_libro: id,
            id_autor: id_autor,
            existeAutor: !existe,
          });
        }
      });

      //comparamos que cada uno de los id del arreglo de la consulta libros existan en el arreglo
      //de idAutores, por lo que el que no exista o no cumpla con la condicion se procedera a actualizar
      //es es diferente al caso de create debido a que se esta comparando cada uno del elemento libro contra
      //los id que el cliente proporciono
      libros.forEach((libro) => {
        const existe = idAutores.some((autor) => {
          return autor === libro.id_autor;
        });
        if (!existe) {
          autoresActualizar.push({
            id: libro.id,
            id_libro: id,
            id_autor: libro.id_autor,
            existeAutor: libro.estado,
            estado: libro.estado,
          });
        }
      });

      //si fuera el caso en el que los mismos datos que fueron enviados por el cliente coinciden con el
      //arreglo de libros procedemos a hacer una segunda validacion, siempre y cuando no existan nuevos registros de autor o
      //que el arreglo de autores a actualizar este vacio posterior en primer validacion
      if (!autoresNuevos.length || !autoresActualizar.length) {
        libros.forEach((libro) => {
          const existe = idAutores.some((autor) => {
            return autor === libro.id_autor && libro.estado === false;
          });
          if (existe) {
            autoresActualizar.push({
              id: libro.id,
              id_libro: id,
              id_autor: libro.id_autor,
              existeAutor: libro.estado,
              estado: libro.estado,
            });
          }
        });
      }

      if (autoresNuevos.length) {
        const nuevosRegistros = autoresNuevos.map((autor) => {
          return {
            id_libro: autor.id_libro,
            id_autor: autor.id_autor,
          };
        });
        await tx.mnt_libro_autor.createMany({
          data: nuevosRegistros,
        });
      }

      autoresActualizar.forEach(async (autor) => {
        await tx.mnt_libro_autor.update({
          where: {
            id: autor.id,
          },
          data: {
            estado: !autor.estado,
          },
        });
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
    try {
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
      };

      const urlPortada = await drive.files.create({
        requestBody: requestBody,
        media,
        fields: "id",
      });

      const fileId = await urlPortada.data.id;
      await drive.permissions.create({
        fileId: fileId!,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
      const imageUrl = `https://drive.google.com/uc?id=${fileId}`;
      return new LibroPortada(imageUrl);
    } catch (error) {
      throw CustomError.internalServer("Error en la peticion de google Drive");
    }
  }

  async getImgPortada(urlPortada: string): Promise<Buffer> {
    try {
      const index: number = urlPortada.toString().indexOf("id=");
      let parametro: string = urlPortada;
      if (index !== -1) {
        parametro = urlPortada.substring(
          index + 3,
          urlPortada.toString().length
        );
      }
      const imgFile = await drive.files.get(
        { fileId: parametro, alt: "media" },
        { responseType: "stream" }
      );
      const valorStream: Buffer = await this.readStream(imgFile.data);
      return valorStream;
    } catch (error) {
      throw error;
    }
  }

  async editImgPortada(
    id: string,
    archivo: Express.Multer.File
  ): Promise<LibroPortada> {
    try {
      const index: number = id.indexOf("id=");
      const parametro = id.substring(index + 3, id.length);
      const { buffer, originalname, mimetype } = archivo;

      const stream = Readable.from(buffer);
      const requestBody = {
        name: originalname,
      };

      const media = {
        mimeType: mimetype,
        body: stream,
      };
      const urlPortadaEdit = await drive.files.update({
        fileId: parametro,
        requestBody,
        media,
      });

      const fileId = await urlPortadaEdit.data.id;
      await drive.permissions.create({
        fileId: fileId!,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      const imagenUrlEdit = `https://drive.google.com/uc?id=${fileId}`;

      return new LibroPortada(imagenUrlEdit);
    } catch (error) {
      throw CustomError.internalServer(
        "Error al editar la imagen multimedia en Google Drive"
      );
    }
  }
  private readStream(stream: Readable): Promise<Buffer> {
    let data: Buffer[] = [];
    return new Promise((resolve, reject) => {
      stream
        .on("data", (chunk: Buffer) => {
          data.push(chunk);
        })
        .on("end", () => {
          const buffer = Buffer.concat(data);
          resolve(buffer);
        })
        .on("error", (err: Error) => {
          reject(err);
        });
    });
  }

  private mapToDomain(
    libro: PostgresLibro,
    portada_multimedia?: Buffer
  ): Libro {
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
      new LibroId(libro.id),
      portada_multimedia
        ? new LibroPortadaMultimedia(portada_multimedia)
        : undefined
    );
  }
}
