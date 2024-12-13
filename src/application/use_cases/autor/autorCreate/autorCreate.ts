import { CustomError } from "../../../../domain";
import { Autor } from "../../../../domain/entities";
import { AutorRepository, PaisRepository } from "../../../../domain/repositories";
import { AutorApellidos, AutorEmail, AutorEstado, AutorFechaNacimiento, AutorIdNacionalidad, AutorLibros, AutorNombres, AutorTelefono, PaisId} from "../../../../domain/valueObject";

export class AutorCreate{
    constructor(private repository: AutorRepository, private repositoryNacionalidad: PaisRepository){}

     async run(
        nombres: string,
        apellidos: string,
        fecha_nacimiento: Date,
        id_nacionalidad: number,
        telefono: string,
        email: string,
        estado: boolean = true,
        libros: Array<number> = []
     ) : Promise<void> {

        
        const pais = await this.repositoryNacionalidad.getOneById(new PaisId(id_nacionalidad));
        
        if(!pais){
            throw CustomError.notFound("El id de la nacionalidad no se encuentra en los registros")
        }
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