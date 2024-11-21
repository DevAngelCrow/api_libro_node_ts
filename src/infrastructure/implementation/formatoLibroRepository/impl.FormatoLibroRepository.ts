import { PrismaClient } from "@prisma/client";
import { FormatoLibroRepository } from "../../../domain/repositories";
import { ConvertToPrismaData } from "./convertToPrismaData";
import { FormatoLibro } from "../../../domain/entities";
import { CustomError } from "../../../domain";
import { FormatoLibroEstado, FormatoLibroFormato, FormatoLibroId, FormatoLibroManufactura } from "../../../domain/valueObject";

type PostgresFormatoLibro = {
    id: number;
    formato: string;
    manufactura: string;
    estado: boolean;
}
export class ImplFormatoLibroRepository implements FormatoLibroRepository{
    private prisma = new PrismaClient();
    private formatoLibros : FormatoLibro[] = [];
    async create(formatoLibro: FormatoLibro): Promise<void> {
        try{
            const dataPrisma = new ConvertToPrismaData().ctlFormatoLibroToPrisma(formatoLibro);
            await this.prisma.ctl_formato_libro.create({
                data: dataPrisma
            });
        }catch(error){
            throw CustomError.internalServer("Error interno en el servidor al crear un tipo de editorial");
        }
    }
    async update(formatoLibro: FormatoLibro): Promise<void> {
        try {
            await this.prisma.ctl_formato_libro.update({
                where: {id: formatoLibro.id?.value},
                data: {
                    formato: formatoLibro.formato.value,
                    manufactura: formatoLibro.manufactura.value,
                    estado: formatoLibro.estado.value,
                    updated_at: new Date(Date.now())
                }
            });
        } catch (error) {
            throw CustomError.internalServer(`Error interno en el servidor al editar el tipo editorial ${formatoLibro.id?.value}`);
        }
    }
    async getAll(): Promise<FormatoLibro[]> {
        try {
            const formatoLibros = await this.prisma.ctl_formato_libro.findMany({
                select:{
                    id: true,
                    formato: true,
                    manufactura: true,
                    estado: true
                },
                orderBy: {
                    id: "asc",
                }
            });
            this.formatoLibros = formatoLibros.map((formatoLibro) => this.mapToDomain(formatoLibro));

            return this.formatoLibros;

        } catch (error) {
            throw CustomError.internalServer(`Error interno en el servidor al obtener el listado de tipos de editoriales`);
        }
    }
    async getOneById(id: FormatoLibroId): Promise<FormatoLibro | null> {
        try {
            const formatoLibro = await this.prisma.ctl_formato_libro.findUnique({
                where: {
                    id: id.value,
                },
                select: {
                    id: true,
                    formato: true,
                    manufactura: true,
                    estado: true,
                }
            });

            if(!formatoLibro){return null}

            return this.mapToDomain(formatoLibro);

        } catch (error) {
            throw CustomError.internalServer(`Error interno en el servidor al obtener el tipo de editorial ${id.value}`);
        }
    }
    async delete(id: FormatoLibroId): Promise<void> {
        try {
            await this.prisma.ctl_formato_libro.update({
                where: {
                    id: id.value
                },
                data:{
                    estado: false,
                }
            })
        } catch (error) {
            throw CustomError.internalServer(`Error interno en el servidor al eliminar el tipo de editorial ${id.value}`);
        }
    }

    private mapToDomain(formatoLibro: PostgresFormatoLibro){
        return new FormatoLibro(
            new FormatoLibroFormato(formatoLibro.formato),
            new FormatoLibroManufactura(formatoLibro.manufactura),
            new FormatoLibroEstado(formatoLibro.estado),
            new FormatoLibroId(formatoLibro.id)
        );
    }
    
}