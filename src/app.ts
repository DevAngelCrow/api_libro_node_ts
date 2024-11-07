import { Server } from "./infrastructure/server";
import { envs } from "./infrastructure/config/envs";
import { AppRoutes } from "./infrastructure/routes";

(async () => {
    main();
})()

async function main(){
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
    });

    server.start();
}