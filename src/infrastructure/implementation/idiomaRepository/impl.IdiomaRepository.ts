import { PrismaClient } from "@prisma/client";
import { CustomError } from "../../../domain";
import { Idioma } from "../../../domain/entities";
import { IdiomaRepository } from "../../../domain/repositories";
import { IdiomaAbreviatura, IdiomaEstado, IdiomaId, IdiomaIdioma, IdiomaRegion } from "../../../domain/valueObject";
import { ConvertToPrismaData } from "./convertToPrismaData";

type PostgresIdioma = {
  id: number;
  idioma: string;
  abreviatura: string;
  estado: boolean;
  region: string;
};

export class ImplIdiomaRepository implements IdiomaRepository {
  private prisma = new PrismaClient();
  private idiomas: Idioma[] = [];
  async create(idioma: Idioma): Promise<void> {
    try {
      const prismaData = new ConvertToPrismaData().ctlIdiomaToPrisma(idioma);
      await this.prisma.ctl_idioma.create({
        data: prismaData,
      });
    } catch (error) {
      throw CustomError.internalServer(
        "Error interno en el servidor al momento de crear un idioma"
      );
    }
  }
  async update(idioma: Idioma): Promise<void> {
    try {
      await this.prisma.ctl_idioma.update({
        where: {
          id: idioma.id?.value,
        },
        data: {
          idioma: idioma.idioma.value,
          abreviatura: idioma.abreviatura.value,
          region: idioma.region?.value,
          estado: idioma.estado?.value,
          updated_at: new Date(Date.now())
        },
      });
    } catch (error) {
      throw CustomError.internalServer(
        `Error interno en el servidor al momento de editar el idioma ${idioma.idioma.value}`
      );
    }
  }
  async getAll(): Promise<Idioma[]> {
    try {
        const idiomas = await this.prisma.ctl_idioma.findMany({
            select: {
                id: true,
                idioma: true,
                abreviatura: true,
                region: true,
                estado: true,
            },
            orderBy: {
              id: "asc"
            }
        });
        const formatIdiomas = idiomas.map((idioma)=>({
          id: idioma.id,
          idioma: idioma.idioma,
          abreviatura: idioma.abreviatura,
          region: idioma.region ? idioma.region : '',
          estado: idioma.estado
        }))
        this.idiomas = formatIdiomas.map((idioma) => this.mapToDomain(idioma)) 
        return this.idiomas;
    } catch (error) {
        throw CustomError.internalServer("Error interno en el servidor al obtener los registros de idiomas");
    }
  }
  async getOneById(id: IdiomaId): Promise<Idioma | null> {
    try {
        const idioma = await this.prisma.ctl_idioma.findUnique({
            where: {
                id: id.value,
            },
            select: {
                id: true,
                idioma: true,
                abreviatura: true,
                region: true,
                estado: true
            },
        });

        if(!idioma){return null}

        return this.mapToDomain(({...idioma, region: idioma.region ? idioma.region : ''}));

    } catch (error) {
      console.log(error, 'no se que pasa')
        throw CustomError.internalServer(`Error interno en el servidor al obtener el registro ${id.value}`);
    }
  }
  async delete(id: IdiomaId): Promise<void> {
    try {
        await this.prisma.ctl_idioma.update({
            where: {
                id: id.value,
            },
            data:{
                estado: false,
                updated_at: new Date(Date.now())
            }
        }) 
    } catch (error) {
        throw CustomError.internalServer(`Error interno en el servidor al eliminar el registro ${id.value}`)
    }
  }

  private mapToDomain(idioma: PostgresIdioma){
    return new Idioma(
        new IdiomaIdioma(idioma.idioma),
        new IdiomaAbreviatura(idioma.abreviatura),
        new IdiomaRegion(idioma.region),
        new IdiomaEstado(idioma.estado),
        new IdiomaId(idioma.id)
    );
  }
}
