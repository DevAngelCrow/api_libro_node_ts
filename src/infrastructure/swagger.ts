import { envs } from "./config/envs";
//import swaggerAutogen from 'swagger-autogen';
import fs, { writeFile } from "fs";
import YAML from "yaml";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger API Libro",
      version: "1.0.0",
      description: "Implementación de Swagger con Typescript",
      contact: {
        name: "Angel-dev",
      },
    },
    servers: [
      {
        url: `http://localhost:${envs.PORT}`,
        description: "Local server",
      },
    ],
  },
};

const arregloSwaggerPaths = fs.readdirSync("./src/swagger/paths");
const directorio = "./src/swagger/paths";
const dirPaths: any[] = [];
arregloSwaggerPaths.forEach((pathYml) => {
  
  
    dirPaths.push(`${directorio}/${pathYml}`);
  
});

let data: string = YAML.stringify(options.definition) + "\n" + "paths:" + "\n";
dirPaths.map((directorio, index) => {
  const fileContent = `${fs
    .readFileSync(directorio, "utf-8")
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n")}`;
  data += `${fileContent}\n`;

  // if (dirPaths.length === index + 1) {
  //   const componentes = {
  //     components: {
  //       schemas: {
  //         "$include": "./swagger/components/schemas/schemas.yaml",
  //       },
  //     },
  //   };

  //   data += YAML.stringify(componentes);
  // }
});



fs.writeFile("./src/swagger/index.yaml", data, (error) => {
  if (error) {
    console.log("Error al escribir en el archivo index", error);
  }
  return;
});

const archivosYaml = fs.readFileSync("./src/swagger/index.yaml", "utf-8");
//const swaggerDocument = YAML.parse(archivosYaml);

export { archivosYaml };

//swaggerAutogen({openapi: '3.0.0'})(outputFile,[], swaggerDocument);
