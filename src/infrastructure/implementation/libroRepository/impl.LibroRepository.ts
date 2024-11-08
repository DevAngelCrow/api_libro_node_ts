import { PrismaClient }  from "@prisma/client";
import { Libro } from "../../../domain/entities/libro/libros.entity";
import { LibroRepository } from "../../../domain/repositories/libro/LibroRepository";
import { LibroId } from "../../../domain/valueObject";
import { ConvertToPrismaData } from "./converToPrismaData";

export class ImplLibroRepository implements LibroRepository {

    private libros: Libro[] = [];

    private prisma = new PrismaClient();

    async create(libro: Libro): Promise<void> {
        
        await this.prisma.mnt_libro.create({
            data: new ConvertToPrismaData().mntLibroToPrisma(libro),
        })
    }
    async getAll(): Promise<Libro[]> {
        return this.libros;
    }
    async getOneById(id: LibroId): Promise<Libro | null> {
       return this.libros.find((libro)=>libro.id.value === id.value) || null;
        
    }
    async update(libro: Libro): Promise<void> {
        const index = this.libros.findIndex((lib)=> lib.id.value == libro.id.value);
        this.libros[index] = libro;
        
    }
    async delete(id: LibroId): Promise<void> {

        this.libros = this.libros.filter((libro)=> libro.id.value !== id.value);
        
    }

}