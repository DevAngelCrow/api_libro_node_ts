import { PrismaClient } from "@prisma/client";
import { TipoEditorial } from "../../../domain/entities";
import { TipoEditorialRepository } from "../../../domain/repositories";
import { TipoEditorialEstado, TipoEditorialId, TipoEditorialNombreTipo } from "../../../domain/valueObject";
import { ConverToPrismaData } from "./convertToPrismaData";
import { CustomError } from "../../../domain";
type PostgresTipoEditorial = {
    id: number;
    nombre_tipo: string;
    estado: boolean;
}
export class ImplTipoEditorialRepository implements TipoEditorialRepository{
    private prisma = new PrismaClient();
    private tipoEditoriales : TipoEditorial[] = [];
    async create(tipoEditorial: TipoEditorial): Promise<void> {
        try{
            const dataPrisma = new ConverToPrismaData().ctlTipoEditorialToPrisma(tipoEditorial);
            await this.prisma.ctl_tipo_editorial.create({
                data: dataPrisma
            });
        }catch(error){
            throw CustomError.internalServer("Error interno en el servidor al crear un tipo de editorial");
        }
    }
    async update(tipoEditorial: TipoEditorial): Promise<void> {
        try {
            await this.prisma.ctl_tipo_editorial.update({
                where: {id: tipoEditorial.id?.value},
                data: {
                    nombre_tipo: tipoEditorial.nombre_tipo.value,
                    estado: tipoEditorial.estado.value,
                    updated_at: new Date(Date.now())
                }
            });
        } catch (error) {
            throw CustomError.internalServer(`Error interno en el servidor al editar el tipo editorial ${tipoEditorial.id?.value}`);
        }
    }
    async getAll(): Promise<TipoEditorial[]> {
        try {
            const tiposEditoriales = await this.prisma.ctl_tipo_editorial.findMany({
                select:{
                    id: true,
                    nombre_tipo: true,
                    estado: true
                },
                orderBy: {
                    id: "asc",
                }
            });
            this.tipoEditoriales = tiposEditoriales.map((tipoEditorial) => this.mapToDomain(tipoEditorial));

            return this.tipoEditoriales;

        } catch (error) {
            throw CustomError.internalServer(`Error interno en el servidor al obtener el listado de tipos de editoriales`);
        }
    }
    async getOneById(id: TipoEditorialId): Promise<TipoEditorial | null> {
        try {
            const tipoEditorial = await this.prisma.ctl_tipo_editorial.findUnique({
                where: {
                    id: id.value,
                },
                select: {
                    id: true,
                    nombre_tipo: true,
                    estado: true,
                }
            });

            if(!tipoEditorial){return null}

            return this.mapToDomain(tipoEditorial);

        } catch (error) {
            throw CustomError.internalServer(`Error interno en el servidor al obtener el tipo de editorial ${id.value}`);
        }
    }
    async delete(id: TipoEditorialId): Promise<void> {
        try {
            console.log(id, 'es el id a eliminar')
            await this.prisma.ctl_tipo_editorial.update({
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

    private mapToDomain(tipoEditorial: PostgresTipoEditorial){
        return new TipoEditorial(
            new TipoEditorialNombreTipo(tipoEditorial.nombre_tipo),
            new TipoEditorialEstado(tipoEditorial.estado),
            new TipoEditorialId(tipoEditorial.id)
        );
    }
    
}