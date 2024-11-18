import { Autor } from "../../../../domain/entities";
import { AutorRepository } from "../../../../domain/repositories";
import { AutorApellidos, AutorEmail, AutorEstado, AutorFechaNacimiento, AutorIdNacionalidad, AutorLibros, AutorNombres, AutorTelefono } from "../../../../domain/valueObject";

export class AutorCreate{
    constructor(private repository: AutorRepository){}

     async run(
        nombres: string,
        apellidos: string,
        fecha_nacimiento: Date,
        id_nacionalidad: number,
        telefono: string,
        email: string,
        estado: boolean,
        libros: Array<number>
     ) : Promise<void> {
        const autor = new Autor(
            new AutorNombres(nombres),
            new AutorApellidos(apellidos),
            new AutorFechaNacimiento(fecha_nacimiento),
            new AutorIdNacionalidad(id_nacionalidad),
            new AutorTelefono(telefono),
            new AutorEmail(email),
            new AutorEstado(estado),
            undefined, undefined,
            new AutorLibros(libros),
        )

        return this.repository.create(autor);
    }
}