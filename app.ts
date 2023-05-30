//import {DB, ensureSampLeDataInserted} from './data';
// @ts-ignore
import express from 'express';
// @ts-ignore
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


app.listen(3000, () => {
    console.log('Server started on port 3000');
});

