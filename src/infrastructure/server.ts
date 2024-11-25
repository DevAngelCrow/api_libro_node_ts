import express, { Router } from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger_output.json';

interface Options{
    port: number;
    routes: Router,
    public_path?: string;
}

export class Server{
    public readonly app = express();
    private serverListener?: any;
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options){
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start(){
        //este middleware nos sirve para poder aceptar y enviar en las peticiones https data que pueda ser consumible
        this.app.use(express.json({limit: '100mb'}));

        //este middleware nos sirve para aceptar y enviar en las peticiones https data por medio de x-www-form-urlencoded
        this.app.use(express.urlencoded({extended: true}));
        // const upload = multer({dest: 'uploads/'})
        // this.app.use(upload.single(this.routes));

        //Public folder
        this.app.use(express.static(this.publicPath));

        //Por este linea pasaran todas las rutas a utilizar de nuestra api
        this.app.use(this.routes);

        //this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
        
        this.app.get('*', (req, response) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            response.sendFile(indexPath);
        });

        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }

    public close(){
        this.serverListener?.close();
    }
}