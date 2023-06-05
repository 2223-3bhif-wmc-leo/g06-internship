// @ts-ignore
import express, {Request, Response, Router} from 'express';
import {Unit} from "../unit";
import {StatusCodes} from "http-status-codes";
import {SchulerService} from "../services/schueler-service";
import {FirmenService} from "../services/firmen-service";
import {PraktikumService} from "../services/praktikum-service";
import {ISchueler} from "../models/model";

const router: Router = express.Router();

// TODO: Implementieren Sie hier die Routen für die Schuler-Entität
router.get('/', async (_: Request, res: Response) => {
    const unit: Unit = await Unit.create(true);
    try {
        const service: SchulerService = new SchulerService(unit);
        const schueler: ISchueler[] = await service.getAll();
        res.status(StatusCodes.OK).json(schueler);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    finally {
        await unit.complete();
    }
});
export default router;