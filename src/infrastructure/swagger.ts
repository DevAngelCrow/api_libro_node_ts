import { envs } from './config/envs';
import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Swagger API Libro',
        description: 'Implementación de Swagger con TypeScript'
    },
    servers: [
        {
            url: `http://localhost:${envs.PORT}`,
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles =  ['./routes.ts'];
swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);