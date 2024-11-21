import { Prisma } from "@prisma/client";
import { FormatoLibro } from "../../../domain/entities";

export class ConvertToPrismaData{
    ctlFormatoLibroToPrisma(formatoLibro: FormatoLibro): Prisma.ctl_formato_libroCreateInput{
        return {
            formato: formatoLibro.formato.value,
            manufactura: formatoLibro.formato.value,
            estado: formatoLibro.estado.value,
        }
    }
}