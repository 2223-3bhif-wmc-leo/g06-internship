//@ts-ignore
import express, {Request, Response, Router} from 'express';
import {Unit} from "../unit";
import {StatusCodes} from "http-status-codes";

import {IApplication, IInternship} from "../models/model";
import {ApplicantService} from "../services/applicant-service";

const router: Router = express.Router();

router.get('/', async (_: Request, res: Response) => {
    const unit: Unit = await Unit.create(true);
    const service = new ApplicantService(unit);
    try {
        const bewerber: IApplication[] = await service.getAll();
        res.status(StatusCodes.OK).json(bewerber);
    } catch (error) {
        console.log(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete();
    }
}).get('/:id', async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const unit: Unit = await Unit.create(true);
    const service = new ApplicantService(unit);
    try {
        const bewerber: IApplication | null = await service.getById(id);
        if (bewerber === null) {
            res.sendStatus(StatusCodes.NOT_FOUND);
        } else {
            res.status(StatusCodes.OK).json(bewerber);
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
    const service = new ApplicantService(unit);
    try {
        const bewerber: IApplication = {
            id: id,
            schuelerId: req.body.schuelerId,
            praktikumId: req.body.praktikumId,
            bewerbungFileName: req.body.bewerbungFileName
        };

        const success: boolean = await service.update(bewerber);
        if (success) {
            await unit.complete(true);
            res.sendStatus(StatusCodes.OK);
        } else {
            await unit.complete(false);
            res.sendStatus(StatusCodes.NOT_FOUND);
        }
    } finally {
        await unit.complete(false);
    }
}).post('/', async (req: Request, res: Response) => {
    const unit: Unit = await Unit.create(false);
    const service = new ApplicantService(unit);
    try {
        const bewerber: IApplication = {
            schuelerId: req.body.schuelerId,
            praktikumId: req.body.praktikumId,
            bewerbungFileName: req.body.bewerbungFileName
        };

        console.log(bewerber)

        const success: boolean = await service.insert(bewerber);
        if (success) {
            await unit.complete(true);
            res.status(StatusCodes.CREATED).send(true);
        } else {
            await unit.complete(false);
            res.status(StatusCodes.NOT_FOUND).send(false)
        }
    } finally {
        await unit.complete(false);
    }
}).delete('/:id', async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const unit: Unit = await Unit.create(false);
    const service = new ApplicantService(unit);
    try {
        const success: boolean = await service.delete(id);
        if (success) {
            await unit.complete(true);
            res.status(StatusCodes.OK).send(true);
        } else {
            await unit.complete(false);
            res.status(StatusCodes.NOT_FOUND).send(false);
        }
    } finally {
        await unit.complete(false);
    }
}).get('/schueler/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const unit: Unit = await Unit.create(true);
    const service = new ApplicantService(unit);
    try {
        const pratika: IInternship[] = await service.getPraktikaByStudentId(id);
        res.status(StatusCodes.OK).json(pratika);
    } catch (error) {
        console.log(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    finally {
        await unit.complete();
    }
});

export default router;
