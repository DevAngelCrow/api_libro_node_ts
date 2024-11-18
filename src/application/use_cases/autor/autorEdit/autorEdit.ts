import { CustomError } from "../../../../domain";
import { Autor } from "../../../../domain/entities";
import { AutorRepository } from "../../../../domain/repositories";
import {
  AutorApellidos,
  AutorEmail,
  AutorEstado,
  AutorFechaNacimiento,
  AutorId,
  AutorIdNacionalidad,
  AutorLibros,
  AutorNombres,
  AutorTelefono,
} from "../../../../domain/valueObject";

export class AutorEdit {
  constructor(private repository: AutorRepository) {}

  async run(
    id: number,
    nombres: string,
    apellidos: string,
    fecha_nacimiento: Date,
    id_nacionalidad: number,
    telefono: string,
    email: string,
    estado: boolean,
    libros: Array<number>
  ): Promise<void> {
    const autorDb = await this.repository.getOneById(new AutorId(id));

    if (!autorDb) {
      throw CustomError.notFound("El autor no fue encontrado");
    }

    const autorEdit = new Autor(
      new AutorNombres(nombres),
      new AutorApellidos(apellidos),
      new AutorFechaNacimiento(fecha_nacimiento),
      new AutorIdNacionalidad(id_nacionalidad),
      new AutorTelefono(telefono),
      new AutorEmail(email),
      new AutorEstado(estado),
      new AutorId(id),
      undefined,
      new AutorLibros(libros)
    );

    return this.repository.update(autorEdit);
  }
}
