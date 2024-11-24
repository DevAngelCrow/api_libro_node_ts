import { CustomError } from "../../errors/custom.error";

export class FormatoLibroManufactura{
    constructor(readonly value: string){
        this.required();
    }
    private required(){
        if(!this.value){
            throw CustomError.badRequest("El campo manufactura es obligatorio")
        }
    }
}