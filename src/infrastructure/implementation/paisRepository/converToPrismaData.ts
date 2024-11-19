import { Prisma } from "@prisma/client";
import { Pais } from "../../../domain/entities";

export class ConverToPrismaData{
    ctlPaisToPrisma(pais: Pais) : Prisma.ctl_paisCreateInput{
        return {
            nombre: pais.nombre.value,
            abreviacion: pais.abreviacion.value,
            codigo: pais.codigo.value,
            estado: pais.estado?.value
        }
    }
}