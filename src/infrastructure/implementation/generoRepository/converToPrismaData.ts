import { Prisma } from "@prisma/client";
import { Genero } from "../../../domain/entities";

export class ConverToPrismaData{
    ctlGeneroToPrisma(genero: Genero): Prisma.ctl_generoCreateInput{
        return {
            nombre: genero.nombre.value,
            descripcion: genero.descripcion.value,
            estado: genero.estado.value
        }
    }
}