import { DB } from "../data";
// @ts-ignore
import express, {Express, request, response} from "express";
// @ts-ignore
import cors from "cors";

import firmenRouter from "./routers/firmen-router";
import praktikaRouter from "./routers/praktikum-router";
import schuelerRouter from "./routers/schueler-router";

const port: number = 3000;
const app: Express = express();

app.use(express.json());
app.use(cors());

app.use('/api/firmen', firmenRouter);
app.use('/api/praktika', praktikaRouter);
app.use('/api/schueler', schuelerRouter);

(async () => {
    const db = await DB.createDBConnection();
    // await db.run('drop table Schuler;');
    // await db.run('drop table Firma;');
    // await db.run('drop table Praktikum;');
})();

app.listen(port, (): void => {
    console.log(`[Server]  server is now running at http://localhost:${port}`);
});