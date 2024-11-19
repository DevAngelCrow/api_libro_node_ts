import { PaisId, PaisNombre, PaisEstado, PaisCodigo, PaisAbreviacion } from "../../valueObject";
export class Pais{
    constructor(
        readonly nombre: PaisNombre,
        readonly abreviacion: PaisAbreviacion,
        readonly codigo: PaisCodigo,
        readonly estado?: PaisEstado,
        readonly id?: PaisId
    ){}

    public mapToPrimitives(){
        return {
            id: this.id?.value,
            nombre: this.nombre.value,
            abreviacion: this.abreviacion.value,
            codigo: this.codigo.value,
            estado: this.estado?.value,
        }
    }
}