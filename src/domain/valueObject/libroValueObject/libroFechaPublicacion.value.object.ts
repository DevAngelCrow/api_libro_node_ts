import { DateTime } from "luxon";


export class LibroFechaPublicacion{
    constructor(private readonly value: string){
        this.isValidDate();
    }

    private isValidDate(){

        let dt = DateTime.fromFormat(this.value, "yyyy/MM/DD");

        if(dt.isValid){
            throw new Error("El formato de la fecha debe ser YYYY/MM/DD")
        }
    }
}