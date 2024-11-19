import { Editorial } from "../../../../domain/entities";
import { EditorialRepository } from "../../../../domain/repositories";
import { EditorialAnioFundacion, EditorialDireccion, EditorialEstado, EditorialIdPais, EditorialIdTipoEditorial, EditorialLibros, EditorialNombre, EditorialSitioWeb, EditorialTelefono } from "../../../../domain/valueObject";

export class EditorialCreate{
    constructor(private repository: EditorialRepository){}

    async run(
        nombre: string,
        direccion: string,
        anio_fundacion: string,
        id_pais: number,
        id_tipo_editorial: number,
        sitio_web: string,
        telefono: string,
        estado: boolean = true,
        libros: Array<number>
    ): Promise<void>{
        const editorial = new Editorial(
            new EditorialNombre(nombre),
            new EditorialDireccion(direccion),
            new EditorialAnioFundacion(anio_fundacion),
            new EditorialIdPais(id_pais), 
            new EditorialIdTipoEditorial(id_tipo_editorial),
            new EditorialTelefono(telefono),
            new EditorialEstado(estado),
            undefined,
            new EditorialSitioWeb(sitio_web),
            new EditorialLibros(libros),
        );

        return this.repository.create(editorial);
    }
}