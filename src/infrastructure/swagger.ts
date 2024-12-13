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
const arregloSwaggerSchemas = fs.readdirSync(
  "./src/swagger/components/schemas"
);
console.log(arregloSwaggerSchemas, "schemas");
const directorio = "./src/swagger/paths";
const directorioSchema = "./src/swagger/components/schemas";
const dirPaths: any[] = [];
const dirSchemas: any[] = [];

arregloSwaggerPaths.forEach((pathYml) => {
  dirPaths.push(`${directorio}/${pathYml}`);
});

arregloSwaggerSchemas.forEach((schemaYml) => {
  dirSchemas.push(`${directorioSchema}/${schemaYml}`);
});
let data: string = YAML.stringify(options.definition) + "\n" + "paths:" + "\n";
const schemasArray: any = [];

dirPaths.map((directorio, index) => {
  const fileContent = `${fs
    .readFileSync(directorio, "utf-8")
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n")}`;
  data += `${fileContent}\n`;
});
data += "components:\n  schemas:\n";
dirSchemas.map((directorio, index) => {
  const nombreSchema = arregloSwaggerSchemas[index].split("Schema.yml");
  data += `    ${nombreSchema[0]}:\n`;
  const fileContent = `${fs
    .readFileSync(directorio, "utf-8")
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n")}`;
  data += `${fileContent}\n`;
});

fs.writeFileSync("./src/swagger/index.yaml", data, "utf-8");

const archivosYaml = fs.readFileSync("./src/swagger/index.yaml", "utf-8");

export { archivosYaml };
