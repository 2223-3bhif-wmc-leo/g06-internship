// @ts-ignore
import express, {Express, request, response} from "express";
// @ts-ignore
import cors from "cors";
// @ts-ignore
import multer, { Multer } from 'multer';

import firmenRouter from "./routers/firmen-router";
import praktikaRouter from "./routers/praktikum-router";
import schuelerRouter from "./routers/schueler-router";
import { join } from "path";
import bewerberRouter from "./routers/bewerber-router";

const port: number = 3000;
const app: Express = express();
const upload: Multer = multer({ dest: 'uploads/' });


app.use(express.json());
app.use(cors());


app.use("/", express.static(join(__dirname, "public")));
app.use('/api/firmen', firmenRouter);
app.use('/api/praktika', praktikaRouter);
app.use('/api/schueler', schuelerRouter);
app.use('/api/bewerber', bewerberRouter);

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }



    res.send('File uploaded successfully.');
});

app.listen(port, (): void => {
    console.log(`[Server]  server is now running at http://localhost:${port}`);
});