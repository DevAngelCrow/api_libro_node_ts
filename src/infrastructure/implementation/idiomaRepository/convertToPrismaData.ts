import { Prisma } from "@prisma/client";
import { Idioma } from "../../../domain/entities";

export class ConvertToPrismaData{
    ctlIdiomaToPrisma(idioma: Idioma): Prisma.ctl_idiomaCreateInput{
        return {
            idioma: idioma.idioma.value,
            abreviatura: idioma.abreviatura.value,
            region: idioma.region.value,
            estado: idioma.estado?.value
        }
    }
}