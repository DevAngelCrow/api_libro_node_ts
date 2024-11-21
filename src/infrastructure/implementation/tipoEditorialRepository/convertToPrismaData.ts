import { Prisma } from "@prisma/client";
import { TipoEditorial } from "../../../domain/entities";

export class ConverToPrismaData{
    ctlTipoEditorialToPrisma(tipoEditorial: TipoEditorial): Prisma.ctl_tipo_editorialCreateInput{
        return {
            nombre_tipo: tipoEditorial.nombre_tipo.value,
            estado: tipoEditorial.estado.value
        }
    }
}