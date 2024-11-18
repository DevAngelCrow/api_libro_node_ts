import { Pais, TipoEditorial } from "..";
import { EditorialAnioFundacion, EditorialDireccion, EditorialEstado, EditorialId, EditorialIdPais, EditorialIdTipoEditorial, EditorialNombre, EditorialSitioWeb, EditorialTelefono } from "../../valueObject";


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
        readonly ctl_pais?: Pais,
        readonly ctl_tipo_editorial?: TipoEditorial,
    ){}

    
}