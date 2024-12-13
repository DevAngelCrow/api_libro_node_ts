import { create } from "domain";
import {
  AutorGetOneById,
  EditorialCreate,
  EditorialDelete,
  EditorialEdit,
  EditorialGetAll,
  EditorialGetOneById,
  FormatoLibroCreate,
  FormatoLibroDelete,
  FormatoLibroEdit,
  FormatoLibroGetAll,
  FormatoLibroGetOneById,
  GeneroCreate,
  GeneroDelete,
  GeneroEdit,
  GeneroGetAll,
  GeneroGetOneById,
  PaisCreate,
  PaisDelete,
  PaisEdit,
  PaisGetAll,
  PaisGetOneById,
  TipoEditorialCreate,
  TipoEditorialDelete,
  TipoEditorialEdit,
  TipoEditorialGetAll,
  TipoEditorialGetOneById,
} from "../../application/use_cases";
import { AutorCreate } from "../../application/use_cases/autor/autorCreate/autorCreate";
import { AutorDelete } from "../../application/use_cases/autor/autorDelete/autorDelete";
import { AutorEdit } from "../../application/use_cases/autor/autorEdit/autorEdit";
import { AutorGetAll } from "../../application/use_cases/autor/autorGetAll/autorGetAll";
import { IdiomaCreate } from "../../application/use_cases/idioma/idiomaCreate/idiomaCreate";
import { IdiomaDelete } from "../../application/use_cases/idioma/idiomaDelete/idiomaDelete";
import { IdiomaEdit } from "../../application/use_cases/idioma/idiomaEdit/idiomaEdit";
import { IdiomaGetAll } from "../../application/use_cases/idioma/idiomaGetAll/idiomaGetAll";
import { IdiomaGetOneById } from "../../application/use_cases/idioma/idiomaGetOneById/idiomaGetOneById";
import { LibroCreate } from "../../application/use_cases/libro/libroCreate/libroCreate";
import { LibroDelete } from "../../application/use_cases/libro/libroDelete/libroDelete";
import { LibroEdit } from "../../application/use_cases/libro/libroEdit/libroEdit";
import { LibroEditImage } from "../../application/use_cases/libro/libroEditImage/libroEditImage";
import { LibroGetAll } from "../../application/use_cases/libro/libroGetAll/libroGetAll";
import { LibroGetFileImage } from "../../application/use_cases/libro/libroGetFileImage/libroGetFileImage";
import { LibroGetOneById } from "../../application/use_cases/libro/libroGetOneById/libroGetOneById";
import { LibroImagenUrlCreate } from "../../application/use_cases/libro/libroImagenUrlCreate/libroImagenUrlCreate";
import { ImplAutorRepository } from "../../infrastructure/implementation/autorRepository/impl.AutorRepository";
import { ImplEditorialRepository } from "../../infrastructure/implementation/editorialRepository/impl.EditorialRepository";
import { ImplIdiomaRepository } from "../../infrastructure/implementation/idiomaRepository/impl.IdiomaRepository";
import { ImplLibroRepository } from "../../infrastructure/implementation/libroRepository/impl.LibroRepository";
import { ImplPaisRepository } from "../../infrastructure/implementation/paisRepository/impl.PaisRepository";
import { ImplTipoEditorialRepository } from "../../infrastructure/implementation/tipoEditorialRepository/impl.TipoEditorialRepository";
import { ImplGeneroRepository } from "../../infrastructure/implementation/generoRepository/impl.GeneroRepository";
import { ImplFormatoLibroRepository } from "../../infrastructure/implementation/formatoLibroRepository/impl.FormatoLibroRepository";
import { AutorFindGroup } from "../../application/use_cases/autor/autorFindGroup/autorFindGroup";

const libroRepository = new ImplLibroRepository();
const autorRepository = new ImplAutorRepository();
const editorialRepository = new ImplEditorialRepository();
const paisRepository = new ImplPaisRepository();
const idiomaRepository = new ImplIdiomaRepository();
const tipoEditorialRepository = new ImplTipoEditorialRepository();
const generoRepository = new ImplGeneroRepository();
const formatoLibroRepository = new ImplFormatoLibroRepository();

export const ServiceContainer = {
  libro: {
    getAll: new LibroGetAll(libroRepository),
    getOneById: new LibroGetOneById(libroRepository),
    delete: new LibroDelete(libroRepository),
    update: new LibroEdit(libroRepository),
    create: new LibroCreate(libroRepository, autorRepository),
    createUrlPortada: new LibroImagenUrlCreate(libroRepository),
    getImageFile: new LibroGetFileImage(libroRepository),
    editImageFile: new LibroEditImage(libroRepository),
  },
  autor: {
    create: new AutorCreate(autorRepository, paisRepository),
    update: new AutorEdit(autorRepository),
    delete: new AutorDelete(autorRepository),
    getAll: new AutorGetAll(autorRepository),
    getOneById: new AutorGetOneById(autorRepository),
    findGroup: new AutorFindGroup(autorRepository)
  },
  editorial: {
    create: new EditorialCreate(editorialRepository),
    update: new EditorialEdit(editorialRepository),
    delete: new EditorialDelete(editorialRepository),
    getAll: new EditorialGetAll(editorialRepository),
    getOneById: new EditorialGetOneById(editorialRepository),
  },
  pais: {
    create: new PaisCreate(paisRepository),
    update: new PaisEdit(paisRepository),
    delete: new PaisDelete(paisRepository),
    getAll: new PaisGetAll(paisRepository),
    getOneById: new PaisGetOneById(paisRepository),
  },
  idioma: {
    create: new IdiomaCreate(idiomaRepository),
    update: new IdiomaEdit(idiomaRepository),
    delete: new IdiomaDelete(idiomaRepository),
    getAll: new IdiomaGetAll(idiomaRepository),
    getOneById: new IdiomaGetOneById(idiomaRepository),
  },
  tipo_Editorial:{
    create: new TipoEditorialCreate(tipoEditorialRepository),
    update: new TipoEditorialEdit(tipoEditorialRepository),
    delete: new TipoEditorialDelete(tipoEditorialRepository),
    getAll: new TipoEditorialGetAll(tipoEditorialRepository),
    getOneById: new TipoEditorialGetOneById(tipoEditorialRepository)
  },
  genero: {
    create: new GeneroCreate(generoRepository),
    update: new GeneroEdit(generoRepository),
    delete: new GeneroDelete(generoRepository),
    getAll: new GeneroGetAll(generoRepository),
    getOneById: new GeneroGetOneById(generoRepository),
  },
  formato_libro: {
    create: new FormatoLibroCreate(formatoLibroRepository),
    update: new FormatoLibroEdit(formatoLibroRepository),
    delete: new FormatoLibroDelete(formatoLibroRepository),
    getAll: new FormatoLibroGetAll(formatoLibroRepository),
    getOneById: new FormatoLibroGetOneById(formatoLibroRepository),
  }
};
