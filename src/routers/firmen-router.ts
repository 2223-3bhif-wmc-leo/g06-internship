// @ts-ignore
import express, {Request, Response, Router} from 'express';
import {Unit} from "../unit";
import {StatusCodes} from "http-status-codes";
import {SchulerService} from "../services/schueler-service";
import {FirmenService} from "../services/firmen-service";
import {PraktikumService} from "../services/praktikum-service";
import {IFirma} from "../models/model";

const router: Router = express.Router();

// TODO: Implementieren Sie hier die Routen für die Firmen-Entität
router.get('/', async (_: Request, res: Response) => {
    const unit: Unit = await Unit.create(true);
    try {
        const service: FirmenService = new FirmenService(unit);
        const firmen: any[] = await service.getAll();
        res.status(StatusCodes.OK).json(firmen);
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
        const service: FirmenService = new FirmenService(unit);
        const firma: any | null = await service.getById(id);

        firma === null ? res.status(StatusCodes.NOT_FOUND).send("Firma not found")
            : res.status(StatusCodes.OK).json(firma);
    } catch (error) {
        console.log(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete();
    }
});

//post not finished!
/*router.post('/', async (req: Request, res: Response) => {
    const unit: Unit = await Unit.create(false);
    try {
        const service: FirmenService = new FirmenService(unit);

    } catch (error) {
        console.log(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete();
    }
});*/

router.post('/', async (req: Request, res: Response) => {
    const unit: Unit = await Unit.create(false);
    try {
        const service: FirmenService = new FirmenService(unit);

        const firma: IFirma = {
            id: Number(req.body.id),
            name: req.body.name,
            email: req.body.email,
            telefon: req.body.telefon,
            beschreibung: req.body.beschreibung,
            addresse: req.body.addresse,
            passwort: req.body.passwort
        }

        const success = await service.insert(firma);

        if (success) {
            await unit.complete(true);
            res.sendStatus(StatusCodes.CREATED);
        } else {
            await unit.complete(false);
            res.sendStatus(StatusCodes.BAD_REQUEST);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete();
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    const unit: Unit = await Unit.create(false);
    try {
        const service: FirmenService = new FirmenService(unit);
        const firma: IFirma | null = await service.getById(id);

        if (firma === null) {
            res.sendStatus(StatusCodes.NOT_FOUND);
        } else {
            const success = await service.delete(id);

            if (success) {
                await unit.complete(true);
                res.sendStatus(StatusCodes.OK);
            } else {
                await unit.complete(false);
                res.sendStatus(StatusCodes.BAD_REQUEST);
            }
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete();
    }
});
export default router;