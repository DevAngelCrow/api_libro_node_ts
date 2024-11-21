import { PrismaClient } from "@prisma/client";
import { GeneroRepository } from "../../../domain/repositories";
import { Genero } from "../../../domain/entities";
import { ConverToPrismaData } from "./converToPrismaData";
import { GeneroDescripcion, GeneroEstado, GeneroId, GeneroNombre } from "../../../domain/valueObject";
import { CustomError } from "../../../domain";

type PostgresGenero = {
    nombre: string;
    descripcion: string | null;
    estado: boolean;
}
export class ImplGeneroRepository implements GeneroRepository{
    private prisma = new PrismaClient();
    private generos : Genero[] = [];
    async create(genero: Genero): Promise<void> {
        try{
            const dataPrisma = new ConverToPrismaData().ctlGeneroToPrisma(genero);
            await this.prisma.ctl_genero.create({
                data: dataPrisma
            });
        }catch(error){
            throw CustomError.internalServer("Error interno en el servidor al crear un registro de genero");
        }
    }
    async update(genero: Genero): Promise<void> {
        try {
            await this.prisma.ctl_genero.update({
                where: {id: genero.id?.value},
                data: {
                    nombre: genero.nombre.value,
                    descripcion: genero.descripcion?.value,
                    estado: genero.estado.value,
                    updated_at: new Date(Date.now())
                }
            });
        } catch (error) {
            throw CustomError.internalServer(`Error interno en el servidor al editar el genero ${genero.id?.value}`);
        }
    }
    async getAll(): Promise<Genero[]> {
        try {
            const generos = await this.prisma.ctl_genero.findMany({
                select:{
                    id: true,
                    nombre: true,
                    descripcion: true,
                    estado: true
                },
                orderBy: {
                    id: "asc",
                }
            });
            this.generos = generos.map((genero) => this.mapToDomain(genero));

            return this.generos;

        } catch (error) {
            throw CustomError.internalServer(`Error interno en el servidor al obtener el listado de generos`);
        }
    }
    async getOneById(id: GeneroId): Promise<Genero | null> {
        try {
            const genero = await this.prisma.ctl_genero.findUnique({
                where: {
                    id: id.value,
                },
                select: {
                    id: true,
                    nombre: true,
                    descripcion: true,
                    estado: true,
                }
            });

            if(!genero){return null}

            return this.mapToDomain(genero);

        } catch (error) {
            throw CustomError.internalServer(`Error interno en el servidor al obtener genero ${id.value}`);
        }
    }
    async delete(id: GeneroId): Promise<void> {
        try {
            await this.prisma.ctl_genero.update({
                where: {
                    id: id.value
                },
                data:{
                    estado: false,
                }
            })
        } catch (error) {
            throw CustomError.internalServer(`Error interno en el servidor al eliminar el genero ${id.value}`);
        }
    }

    private mapToDomain(genero: PostgresGenero){
        return new Genero(
            new GeneroNombre(genero.nombre),
            new GeneroDescripcion(genero.descripcion ?? ""),
            new GeneroEstado(genero.estado)
        );
    }
    
}