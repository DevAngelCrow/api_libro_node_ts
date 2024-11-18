import { DateTime } from "luxon";
import {
  AutorApellidos,
  AutorEmail,
  AutorEstado,
  AutorFechaNacimiento,
  AutorId,
  AutorIdNacionalidad,
  AutorNombres,
  AutorTelefono,
  AutorLibros
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
    readonly ctl_nacionalidad?: Pais,
    readonly libros?: AutorLibros
  ) {}


  public mapToPrimitives(){
    const fecha = DateTime.fromJSDate(this.fecha_nacimiento.value);
    return {
    id: this.id?.value,
    nombre: this.nombres.value,
    fecha_nacimiento: fecha.toFormat('dd-MM-yyyy'),
    ctl_nacionalidad: this.mapToPrimitiveNacionalidad(),
    telefono: this.telefono.value,
    email: this.email.value,
    estado: this.estado?.value, 
    }
  }

  public mapToPrimitiveNacionalidad(){
    return {
      nombre: this.ctl_nacionalidad?.nombre.value,
      abreviacion: this.ctl_nacionalidad?.abreviacion.value,
      codigo: this.ctl_nacionalidad?.codigo.value,
      estado: this.ctl_nacionalidad?.estado?.value,
      id: this.ctl_nacionalidad?.id?.value,

    }
  }
}


