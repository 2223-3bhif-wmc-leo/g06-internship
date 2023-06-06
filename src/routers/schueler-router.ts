// @ts-ignore
import express, {Request, Response, Router} from 'express';
import {Unit} from "../unit";
import {StatusCodes} from "http-status-codes";
import {SchulerService} from "../services/schueler-service";
import {FirmenService} from "../services/firmen-service";
import {PraktikumService} from "../services/praktikum-service";
import {ISchueler} from "../models/model";

const router: Router = express.Router();

router.get('/', async (_: Request, res: Response) => {
    const unit: Unit = await Unit.create(true);
    try {
        const service: SchulerService = new SchulerService(unit);
        const schueler: ISchueler[] = await service.getAll();
        res.status(StatusCodes.OK).json(schueler);
    } catch (error) {
        console.log(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete();
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    const unit: Unit = await Unit.create(true);
    try {
        const service: SchulerService = new SchulerService(unit);
        const schueler: ISchueler | null = await service.getById(id);
        if (schueler === null) {
            res.sendStatus(StatusCodes.NOT_FOUND);
        } else {
            res.status(StatusCodes.OK).json(schueler);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete();
    }
});

// TODO: Implementieren der put Methode (failed)
router.put('/:id', async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    const unit: Unit = await Unit.create(false);

    try {
        const service: SchulerService = new SchulerService(unit);

        let schueler: ISchueler | null = await service.getById(id);
        const existing: boolean = schueler !== null;
        schueler = {
            id: id,
            name: req.body.name,
            email: req.body.email,
            adresse: req.body.adresse,
            telefon: req.body.telefon,
        };

        const success: boolean = await (existing ? service.update(schueler) : service.insert(schueler));

        if (success) {
            await unit.complete(true);
            res.status(existing ? StatusCodes.NO_CONTENT : StatusCodes.CREATED).json(schueler);
        } else {
            await unit.complete(false);
            res.sendStatus(StatusCodes.BAD_REQUEST);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete(false);
    }
});

// TODO: Implementieren der put Methode (bad)
router.delete('/:id', async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    const unit: Unit = await Unit.create(false);
    try {
        const service: SchulerService = new SchulerService(unit);
        const schueler: ISchueler | null = await service.getById(id);
        if (schueler === null) {
            res.sendStatus(StatusCodes.NOT_FOUND);
        } else {
            const success: boolean = await service.delete(id);
            if (success) {
                await unit.complete(true);
                res.sendStatus(StatusCodes.NO_CONTENT);
            } else {
                await unit.complete(false);
                res.sendStatus(StatusCodes.BAD_REQUEST);
            }
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete(false);
    }

});
export default router;