import { Prisma } from "@prisma/client";
import { Autor } from "../../../domain/entities";

export class ConvertToPrismaData {
  mntAutorToPrisma(autor: Autor): Prisma.mnt_autorCreateInput {
    return {
      nombres: autor.nombres.value,
      apellidos: autor.apellidos.value,
      fecha_nacimiento: autor.fecha_nacimiento.value,
      telefono: autor.telefono.value,
      email: autor.email.value,
      estado: autor.estado?.value,
      ctl_pais: {
        connect: { id: autor.id_nacionalidad.value },
      },
    };
  }
}
