// @ts-ignore
import express, {Express, request, response} from "express";
// @ts-ignore
import cors from "cors";
// @ts-ignore
import multer, { Multer } from 'multer';

import companyRouter from "./routers/company-router";
import internshipRouter from "./routers/internship-router";
import studentRouter from "./routers/student-router";
import { join } from "path";
import applicantRouter from "./routers/applicant-router";
import {Unit} from "./unit";
import * as bodyParser from "body-parser";
import {StatusCodes} from "http-status-codes";
import * as fs from "fs";
import * as path from "path";

const port: number = 3000;
const app: Express = express();
const upload: Multer = multer({ dest: 'uploads/' });


app.use(express.json());
app.use(cors());


app.use("/", express.static(join(__dirname, "public")));
app.use('/api/firmen', companyRouter);
app.use('/api/praktika', internshipRouter);
app.use('/api/schueler', studentRouter);
app.use('/api/bewerber', applicantRouter);

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send(false);
    }

    const originalFileName = req.file.originalname;
    const uploadedFilePath = req.file.path;

    const newFilePath = path.join(path.dirname(uploadedFilePath), originalFileName);
    fs.rename(uploadedFilePath, newFilePath, (err) => {
        if (err) {
            console.error('Error renaming file:', err);
            return res.status(500).send('Error renaming file.');
        }

        res.send('File uploaded successfully.');
    });
});

app.listen(port, (): void => {
    console.log(`[Server]  server is now running at http://localhost:${port}`);
});