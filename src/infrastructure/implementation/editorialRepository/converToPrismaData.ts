import { Prisma } from "@prisma/client";
import { Editorial } from "../../../domain/entities";

export class ConvertToPrismaData{
    mntEditorialToPrisma(editorial: Editorial) : Prisma.mnt_editorialCreateInput{
        return {
            nombre: editorial.nombre.value,
            direccion: editorial.direccion.value,
            anio_fundacion: editorial.anio_fundacion.value,
            sitio_web: editorial.sitio_web?.value,
            telefono: editorial.telefono.value,
            estado: editorial.estado.value,
            ctl_pais:{
                connect: {
                    id: editorial.id_pais.value
                }
            },
            ctl_tipo_editorial: {
                connect: {
                    id: editorial.id_tipo_editorial.value
                }
            }
        }
    }
}