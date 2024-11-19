import { CustomError } from "../../../../domain";
import { Editorial } from "../../../../domain/entities";
import { EditorialRepository } from "../../../../domain/repositories";
import { EditorialAnioFundacion, EditorialDireccion, EditorialEstado, EditorialId, EditorialIdPais, EditorialIdTipoEditorial, EditorialLibros, EditorialNombre, EditorialSitioWeb, EditorialTelefono } from "../../../../domain/valueObject";

export class EditorialEdit{
    constructor(private repository: EditorialRepository){}

    async run(
        id: number,
        nombre: string,
        direccion: string,
        anio_fundacion: string,
        id_pais: number,
        id_tipo_editorial: number,
        sitio_web: string,
        telefono: string,
        estado: boolean,
        libros: Array<number>
    ):Promise<void>{
        const editorial = await this.repository.getOneById(new EditorialId(id));

        if(!editorial){
            throw CustomError.notFound("La editorial no fue encontrada");
        }

        const editorialEdit = new Editorial(
            new EditorialNombre(nombre),
            new EditorialDireccion(direccion),
            new EditorialAnioFundacion(anio_fundacion),
            new EditorialIdPais(id_pais),
            new EditorialIdTipoEditorial(id_tipo_editorial),
            new EditorialTelefono(telefono),
            new EditorialEstado(estado),
            new EditorialId(id),
            new EditorialSitioWeb(sitio_web),
            new EditorialLibros(libros)
        );

        return this.repository.update(editorialEdit);
    }
}