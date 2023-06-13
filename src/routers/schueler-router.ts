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
    const studentService: SchulerService = new SchulerService(unit);

    const schueler: ISchueler = {
        id: id,
        name: req.body.name,
        email: req.body.email,
        passwort: req.body.passwort,
        adresse: req.body.adresse,
        telefon: req.body.telefon
    };

    console.log(schueler);

    try {
        const success = await studentService.update(schueler);
        if (success) {
            await unit.complete(true);
            res.status(StatusCodes.OK).send(true);
        } else {
            await unit.complete(false);
            res.status(StatusCodes.NOT_FOUND).send(false);
        }
    } catch (e) {
        console.log(e);
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

    let schuelerGeneratedId: number|null = null;

    try {
        let success = false;

        if(await (await schuelerService.getAll()).find(s => s.email === schueler.email)){
            res.status(StatusCodes.NOT_ACCEPTABLE).send(false);
            return;
        }else {
            let [success1, generatedID] = await schuelerService.insert(schueler);
            success = success1;
            schuelerGeneratedId = generatedID;
        }
        if (success) {
            await unit.complete(true);
            res.status(StatusCodes.CREATED).send(true).send(schuelerGeneratedId);
        } else {
            await unit.complete(false);
            res.status(StatusCodes.NOT_FOUND).send(true);
        }
    } catch (e) {
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(true);
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
}).get('/praktikum/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const unit: Unit = await Unit.create(true);
    const schuelerService: SchulerService = new SchulerService(unit);

    try {
        const schueler: ISchueler | null = await schuelerService.getById(id);
        if (schueler === null) {
            res.status(StatusCodes.NOT_FOUND).send(false);
        } else {
            res.status(StatusCodes.OK).json(schueler);
        }
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