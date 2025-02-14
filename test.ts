import { app, Get, listAllRoutes } from "./src"

app.setApplicationName("ModestApp");

app.setApiGlobalPrefix('/api/v1');

app.listeningPort(3000);

console.log(app.getApplicationName())

