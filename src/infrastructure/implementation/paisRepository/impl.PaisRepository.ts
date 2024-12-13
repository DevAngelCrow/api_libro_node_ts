import { Prisma, PrismaClient } from "@prisma/client";
import { CustomError } from "../../../domain";
import { Pais } from "../../../domain/entities";
import { PaisRepository } from "../../../domain/repositories";
import { PaisAbreviacion, PaisCodigo, PaisEstado, PaisId, PaisNombre } from "../../../domain/valueObject";
import { ConverToPrismaData } from "./converToPrismaData";

type PostgresPais = {
    id: number,
    nombre: string,
    abreviacion: string,
    codigo: string,
    estado: boolean,
}
export class ImplPaisRepository implements PaisRepository{
    private prisma = new PrismaClient();
    private paises : Pais[] = [];
    async create(pais: Pais): Promise<void> {
        try{
            const prismaData = new ConverToPrismaData().ctlPaisToPrisma(pais);
            await this.prisma.ctl_pais.create({
                data: prismaData
            });
        }catch(error){
            throw CustomError.internalServer("Error interno en el servidor al crear país")
        }
    }
    async update(pais: Pais): Promise<void> {
        try{
            await this.prisma.ctl_pais.update({
                where: {
                    id: pais.id?.value
                },
                data: {
                    nombre: pais.nombre.value,
                    abreviacion: pais.abreviacion.value,
                    codigo: pais.codigo.value,
                    estado: pais.estado?.value,
                    updated_at: new Date(Date.now())
                }
            })
        }catch(error){
            throw CustomError.internalServer("Error interno del servidor al actualizar país");
        }
    }
    async getAll(): Promise<Pais[]> {
        try {
            const paisesDb =  await this.prisma.ctl_pais.findMany({
                select:{
                    nombre: true,
                    abreviacion: true,
                    codigo: true,
                    estado: true,
                    id: true,
                }
            });

            this.paises = paisesDb.map((pais) => this.mapToDomain(pais))

            return this.paises;
        } catch (error) {
            throw CustomError.internalServer("Error interno del servidor al obtener paises");
        }
    }
    async getOneById(id: PaisId): Promise<Pais | null> {
        try{
            const pais = await this.prisma.ctl_pais.findUnique({
                where: {
                    id: id.value
                },
                select: {
                    id: true,
                    nombre: true,
                    abreviacion: true,
                    codigo: true,
                    estado: true,
                },
            });

            if(!pais){
                //throw CustomError.notFound("No se encontro el pais papu")
                return null;
            }

            return this.mapToDomain(pais);

        }catch(error){
            throw CustomError.internalServer("Error interno del servidor al obtener país")
        }
    }
    async delete(id: PaisId): Promise<void> {
        try {
            await this.prisma.ctl_pais.update({
                where: {
                    id: id.value
                },
                data: {
                    estado: false,
                }
            })
        } catch (error) {
            throw CustomError.internalServer("Error interno del servidor al eliminar el registro de país")
        }
    }

    private mapToDomain(pais: PostgresPais){
        return new Pais(
            new PaisNombre(pais.nombre),
            new PaisAbreviacion(pais.abreviacion),
            new PaisCodigo(pais.codigo),
            new PaisEstado(pais.estado),
            new PaisId(pais.id)

        )
    }

}