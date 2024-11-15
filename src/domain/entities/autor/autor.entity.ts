import {
  AutorApellidos,
  AutorEmail,
  AutorEstado,
  AutorFechaNacimiento,
  AutorId,
  AutorIdNacionalidad,
  AutorNombres,
  AutorTelefono,
} from "../../valueObject";

import { Pais } from "../index";

export class Autor {
  constructor(
    readonly nombres: AutorNombres,
    readonly apellidos: AutorApellidos,
    readonly fecha_nacimiento: AutorFechaNacimiento,
    readonly id_nacionalidad: AutorIdNacionalidad,
    readonly telefono: AutorTelefono,
    readonly email: AutorEmail,
    readonly estado?: AutorEstado,
    readonly id?: AutorId,
    readonly ctl_nacionalidad?: Pais
  ) {}
}
