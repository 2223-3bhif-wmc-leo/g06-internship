// @ts-ignore
import express, {Request, Response, Router} from 'express';
import {Unit} from "../unit";
import {StatusCodes} from "http-status-codes";
import {SchulerService} from "../services/schueler-service";
import {IFirma, ISchueler} from "../models/model";
import {FirmenService} from "../services/firmen-service";

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
}).get('/:id', async (req: Request, res: Response) => {
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
}).put('/:id', async (req: Request, res: Response) => {
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
            passwort: req.body.passwort,
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
}).post('/', async (req: Request, res: Response) => {
    const unit: Unit = await Unit.create(false);
    const schuelerService: SchulerService = new SchulerService(unit);


    const schueler: ISchueler = {
        name: req.body.name,
        email: req.body.email,
        passwort: req.body.passwort,
        adresse: req.body.adresse,
        telefon: req.body.telefon,
    };

    try {
        const success = await schuelerService.insert(schueler);
        if (success) {
            await unit.complete(true);
            res.sendStatus(StatusCodes.CREATED);
        } else {
            await unit.complete(false);
            res.sendStatus(StatusCodes.NOT_FOUND);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete(true);
    }
}).delete('/:id', async (req: Request, res: Response) => {
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

}).get('/login/try', async (req: Request, res: Response) => {
    let email = req.query.email;
    let passwort = req.query.passwort;

    if (email === undefined || passwort === undefined) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    } else {
        email = email.toString();
        passwort = passwort.toString();
    }

    const unit: Unit = await Unit.create(true);

    try {
        const service: SchulerService = new SchulerService(unit);
        const schueler: ISchueler | null = await service.login(email, passwort);

        if (schueler === null) {
            res.sendStatus(StatusCodes.NOT_ACCEPTABLE);
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
export default router;