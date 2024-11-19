import { Pais, TipoEditorial } from "..";
import { EditorialAnioFundacion, EditorialDireccion, EditorialEstado, EditorialId, EditorialIdPais, EditorialIdTipoEditorial, EditorialLibros, EditorialNombre, EditorialSitioWeb, EditorialTelefono } from "../../valueObject";


export class Editorial{
    constructor(
        readonly nombre: EditorialNombre,
        readonly direccion: EditorialDireccion,
        readonly anio_fundacion: EditorialAnioFundacion,
        readonly id_pais: EditorialIdPais,
        readonly id_tipo_editorial: EditorialIdTipoEditorial,
        readonly telefono: EditorialTelefono,
        readonly estado: EditorialEstado,
        readonly id?: EditorialId,
        readonly sitio_web?: EditorialSitioWeb,
        readonly libros?: EditorialLibros,
        readonly ctl_pais?: Pais,
        readonly ctl_tipo_editorial?: TipoEditorial,
    ){}

    public mapToPrimitives(){
        return {
            id: this.id?.value,
            nombre: this.nombre.value,
            direccion: this.direccion.value,
            anio_fundacion: this.anio_fundacion.value,
            ctl_pais: this.mapToPrimitivesPais(),
            ctl_tipo_editorial: this.mapToPrimitivesTipoEditorial(),
            sitio_web: this.sitio_web?.value,
            telefono: this.telefono.value,
            estado: this.estado.value,
        }
    }

    private mapToPrimitivesPais(){
        return {
            id: this.ctl_pais?.id?.value,
            nombre: this.ctl_pais?.nombre.value,
            abreviacion: this.ctl_pais?.abreviacion.value,
            codigo: this.ctl_pais?.codigo.value,
            estado: this.ctl_pais?.estado?.value
        }
    }

    private mapToPrimitivesTipoEditorial(){
        return {
            id: this.ctl_tipo_editorial?.id?.value,
            nombre_tipo: this.ctl_tipo_editorial?.nombre_tipo.value,
            estado: this.ctl_tipo_editorial?.estado.value
        }
    }
}