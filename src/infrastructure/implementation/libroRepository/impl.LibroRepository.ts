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
  LibroNombre,
  LibroNumeroPaginas,
  LibroPortada,
  LibroResumen,
} from "../../../domain/valueObject";
import { ConvertToPrismaData } from "./converToPrismaData";
import { CustomError } from "../../../domain";
import { Genero } from "../../../domain/entities/genero/genero.entity";
import { FormatoLibro } from "../../../domain/entities/formato_libro/formatoLibro.entity";
import drive from "../../config/googleDrive";
import { Readable } from "stream";
import { LibroPortadaMultimedia } from "../../../domain/valueObject/libroValueObject/libroPortadaMultimedia.value.object";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

type PostgresLibro = {
  id: number;
  nombre: string;
  fecha_publicacion: Date;
  id_genero: number;
  edicion: string;
  portada: string;
  id_formato_libro: number;
  resumen: string;
  numero_paginas: number;
  estado: boolean;
  ctl_formato_libro?: { [key: string]: any };
  ctl_genero?: { [key: string]: any };
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
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        const tablasForaneas: Array<string> = [
          "mnt_libro_editorial",
          "ctl_idioma",
          "ctl_genero",
          "mnt_libro_autor",
          "ctl_formato_libro",
        ];

        const erroresTablas = tablasForaneas
          .map((item) => {
            const mathResult = error?.meta?.cause?.toString().match(item);
            return mathResult ? mathResult[0] : null;
          })
          .filter((result) => result !== null);

        const primerMatch = erroresTablas[0];
        throw CustomError.badRequest(
          `El id utilizado no existe en la tabla ${primerMatch}`
        );
      }
      throw CustomError.internalServer(
        "Error interno del servidor al crear un registro de libro"
      );
    }
  }
  async getAll(): Promise<Libro[]> {
    try {
      const librosBd = await this.prisma.mnt_libro.findMany({
        select: {
          ctl_formato_libro: true,
          ctl_genero: true,
          id: true,
          nombre: true,
          fecha_publicacion: true,
          id_genero: true,
          id_formato_libro: true,
          edicion: true,
          portada: true,
          estado: true,
          resumen: true,
          numero_paginas: true,
        },
        orderBy: {
          id: "asc",
        },
      });

      this.libros = librosBd.map((libro) => {
        return this.mapToDomain(libro);
      });
      return this.libros;
    } catch (error) {
      throw CustomError.internalServer(
        "Error interno del servidor al obtener libros"
      );
    }
  }
  async getOneById(id: LibroId): Promise<Libro | null> {
    try {
      const libro = await this.prisma.mnt_libro.findUnique({
        where: {
          id: id.value,
        },
        select: {
          ctl_formato_libro: true,
          ctl_genero: true,
          id: true,
          nombre: true,
          fecha_publicacion: true,
          id_genero: true,
          id_formato_libro: true,
          edicion: true,
          portada: true,
          estado: true,
          resumen: true,
          numero_paginas: true,
          mnt_libro_autor: {
            select: {
              mnt_autor: {
                select: {
                  id: true,
                  nombres: true,
                  apellidos: true,
                  fecha_nacimiento: true,
                  telefono: true,
                  email: true,
                }
              }
            }
          },
          mnt_libro_editorial: {
            select: {
              mnt_editorial: {
                select: {
                  id: true,
                  nombre: true,
                }
              }
            }
          },
          mnt_libro_idioma: {
            select: {
              ctl_idioma: {
                select: {
                  id: true,
                  idioma: true,
                }
              }
            }
          }
        },
      });
      if (!libro) {
        return null;
      }

      const portadaBuffer = await this.getImgPortada(libro.portada);

      if (!portadaBuffer) {
        throw CustomError.internalServer(
          "Ocurrio un problema al obtener la imagen desde Google Drive"
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
            id_genero: libro.id_genero.value,
            edicion: libro.edicion.value,
            portada: libro.portada.value,
            id_formato_libro: libro.id_formato_libro.value,
            resumen: libro.resumen.value,
            numero_paginas: libro.numero_paginas.value,
            estado: libro.estado?.value,
            updated_at: new Date(Date.now()),
          },
        });

        await this.updateLibroAutor(tx, id?.value!, libro.autores?.value!);
        await this.updateLibroEditorial(
          tx,
          id?.value!,
          libro.editoriales?.value!
        );
        await this.updateLibroIdioma(tx, id?.value!, libro.idiomas?.value!)
      });
    } catch (error) {
      console.log(error, 'en update')
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
        select: {
          id: true,
          id_libro: true,
          id_autor: true,
          estado: true,
        },
      });

      const idsExistentes = new Set(libros.map((libro) => libro.id_autor));

      //este arreglo almacenará los autores que ya estan asociados pero que seran desactivados del libro.
      const autoresADesactivar = libros.filter(
        (libro) => !idAutores.includes(libro.id_autor)
      );

      //este arreglo almacenará los autores que ya estan asociados pero que seran activados del libro
      const autoresReactivar = libros.filter(
        (libro) => idAutores.includes(libro.id_autor) && libro.estado === false
      );
      //este arreglo almacenara los autores que nunca han sido asociados a un libro.
      const autoresNuevos = idAutores.filter(
        (idAutor) => !idsExistentes.has(idAutor)
      );

      if (autoresADesactivar.length) {
        await tx.mnt_libro_autor.updateMany({
          where: {
            id_libro: id,
            id_autor: { in: autoresADesactivar.map((autor) => autor.id_autor) },
          },
          data: {
            estado: false,
            updated_at: new Date(Date.now()),
          },
        });
      }

      if (autoresReactivar.length) {
        await tx.mnt_libro_autor.updateMany({
          where: {
            id_libro: id,
            id_autor: { in: autoresReactivar.map((autor) => autor.id_autor) },
          },
          data: { estado: true, updated_at: new Date(Date.now()) },
        });
      }

      if (autoresNuevos.length) {
        const nuevosRegistros = autoresNuevos.map((idAutor) => ({
          id_libro: id,
          id_autor: idAutor,
          estado: true,
        }));

        await tx.mnt_libro_autor.createMany({
          data: nuevosRegistros,
        });
      }
    } catch (error) {
      console.log(error, 'error en updateLibroAutor')
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw CustomError.internalServer(
          "Error interno en la actualizacion del libro"
        );
      }
    }
  }

  async updateLibroEditorial(
    tx: Prisma.TransactionClient,
    id: number,
    idEditoriales: Array<number>
  ) {
    try {
      const libros = await tx.mnt_libro_editorial.findMany({
        where: {
          id_libro: id,
        },
        select: {
          id: true,
          id_libro: true,
          id_editorial: true,
          estado: true,
        },
      });

      const idsExistentes = new Set(libros.map((libro) => libro.id_editorial));

      //este arreglo almacenará los autores que ya estan asociados pero que seran desactivados del libro.
      const editorialesADesactivar = libros.filter(
        (libro) => !idEditoriales.includes(libro.id_editorial)
      );

      //este arreglo almacenará los autores que ya estan asociados pero que seran activados del libro
      const editorialesReactivar = libros.filter(
        (libro) =>
          idEditoriales.includes(libro.id_editorial) && libro.estado === false
      );
      //este arreglo almacenara los autores que nunca han sido asociados a un libro.
      const editorialesNuevas = idEditoriales.filter(
        (idEditorial) => !idsExistentes.has(idEditorial)
      );

      if (editorialesADesactivar.length) {
        await tx.mnt_libro_editorial.updateMany({
          where: {
            id_libro: id,
            id_editorial: {
              in: editorialesADesactivar.map(
                (editorial) => editorial.id_editorial
              ),
            },
          },
          data: {
            estado: false,
            updated_at: new Date(Date.now()),
          },
        });
      }

      if (editorialesReactivar.length) {
        await tx.mnt_libro_editorial.updateMany({
          where: {
            id_libro: id,
            id_editorial: {
              in: editorialesReactivar.map(
                (editorial) => editorial.id_editorial
              ),
            },
          },
          data: { estado: true, updated_at: new Date(Date.now()) },
        });
      }

      if (editorialesNuevas.length) {
        const nuevosRegistros = editorialesNuevas.map((idEditorial) => ({
          id_libro: id,
          id_editorial: idEditorial,
          estado: true,
        }));

        await tx.mnt_libro_editorial.createMany({
          data: nuevosRegistros,
        });
      }
    } catch (error) {
      console.log(error, 'error en updateLibroEditorial')
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw CustomError.internalServer(
          "Error interno en la actualizacion del libro"
        );
      }
    }
  }

  async updateLibroIdioma(
    tx: Prisma.TransactionClient,
    id: number,
    idIdiomas: Array<number>
  ) {
    try {
      const libros = await tx.mnt_libro_idioma.findMany({
        where: {
          id_libro: id,
        },
        select: {
          id: true,
          id_libro: true,
          id_idioma: true,
          estado: true,
        },
      });

      const idsExistentes = new Set(libros.map((libro) => libro.id_idioma));

      //este arreglo almacenará los autores que ya estan asociados pero que seran desactivados del libro.
      const idiomasADesactivar = libros.filter(
        (libro) => !idIdiomas.includes(libro.id_idioma)
      );

      //este arreglo almacenará los autores que ya estan asociados pero que seran activados del libro
      const idiomasReactivar = libros.filter(
        (libro) => idIdiomas.includes(libro.id_idioma) && libro.estado === false
      );
      //este arreglo almacenara los autores que nunca han sido asociados a un libro.
      const idiomasNuevos = idIdiomas.filter(
        (idIdioma) => !idsExistentes.has(idIdioma)
      );

      if (idiomasADesactivar.length) {
        await tx.mnt_libro_idioma.updateMany({
          where: {
            id_libro: id,
            id_idioma: { in: idiomasADesactivar.map((idioma) => idioma.id_idioma) },
          },
          data: {
            estado: false,
          },
        });
      }

      if (idiomasReactivar.length) {
        await tx.mnt_libro_idioma.updateMany({
          where: {
            id_libro: id,
            id_idioma: { in: idiomasReactivar.map((idioma) => idioma.id_idioma) },
          },
          data: { estado: true},
        });
      }

      if (idiomasNuevos.length) {
        const nuevosRegistros = idiomasNuevos.map((idIdioma) => ({
          id_libro: id,
          id_idioma: idIdioma,
          estado: true,
        }));

        await tx.mnt_libro_idioma.createMany({
          data: nuevosRegistros,
        });
      }
    } catch (error) {
      console.log(error, 'idiomas')
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
      throw CustomError.internalServer("Error interno del servidor");
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
      console.log(error, "error google");
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
      console.log(error, "error al crear url de la portada");
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
        new FormatoLibroFormato(libro?.ctl_formato_libro?.formato!),
        new FormatoLibroManufactura(libro?.ctl_formato_libro?.manufactura!),
        new FormatoLibroEstado(libro?.ctl_formato_libro?.estado!),
        new FormatoLibroId(libro?.ctl_formato_libro?.id!)
      ),
      // new Idioma(
      //   new IdiomaIdioma(libro?.ctl_idioma?.idioma!),
      //   new IdiomaAbreviatura(libro?.ctl_idioma?.abreviatura!),
      //   new IdiomaRegion(libro?.ctl_idioma?.region!),
      //   new IdiomaEstado(libro?.ctl_idioma?.estado!),
      //   new IdiomaId(libro?.ctl_idioma?.id!)
      // ),
      new LibroId(libro.id),
      portada_multimedia
        ? new LibroPortadaMultimedia(portada_multimedia)
        : undefined
    );
  }
}
