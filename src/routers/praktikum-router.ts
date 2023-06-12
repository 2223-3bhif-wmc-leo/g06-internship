// @ts-ignore
import express, {Request, Response, Router} from 'express';
import {Unit} from "../unit";
import {StatusCodes} from "http-status-codes";
import {PraktikumService} from "../services/praktikum-service";
import {IPraktikum} from "../models/model";

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const unit: Unit = await Unit.create(true);
    const praktikaService: PraktikumService = new PraktikumService(unit);
    try {
        const praktika = await praktikaService.getPraktika();
        res.status(StatusCodes.OK).json(praktika);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete();
    }
}).get('/firma/:id', async (req: Request, res: Response) => {
    const firmaId: number = parseInt(req.params.id);
    const unit: Unit = await Unit.create(true);
    const praktikaService: PraktikumService = new PraktikumService(unit);
    try {
        const praktikaOfFirma = await praktikaService.getPraktikaOfFirma(firmaId);
        if (praktikaOfFirma.length > 0) {
            res.status(StatusCodes.OK).json(praktikaOfFirma);
        } else {
            res.sendStatus(StatusCodes.NOT_FOUND);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete();
    }

}).get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const unit: Unit = await Unit.create(true);
    const praktikaService: PraktikumService = new PraktikumService(unit);
    try {
        const praktikum = await praktikaService.getPraktikumById(id);
        if (praktikum !== null) {
            res.status(StatusCodes.OK).json(praktikum);
        } else {
            res.sendStatus(StatusCodes.NOT_FOUND);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete();
    }
}).post('/', async (req: Request, res: Response) => {
    const unit: Unit = await Unit.create(false);
    const praktikaService: PraktikumService = new PraktikumService(unit);

    const praktikum: IPraktikum = {
        titel: req.body.titel,
        beschreibung: req.body.beschreibung,
        dauertage: req.body.dauertage,
        anforderungen: req.body.anforderungen,
        firma: req.body.firma,
        gehalt: req.body.gehalt,
        aufgegeben : new Date().toDateString()
    }

    try {
        const success = await praktikaService.insertPraktikum(praktikum);
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
        await unit.complete(false);
    }

}).put('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const unit: Unit = await Unit.create(false);
    const praktikaService: PraktikumService = new PraktikumService(unit);

    try{
        const praktikum: IPraktikum = {
            id: id,
            titel: req.body.titel,
            beschreibung: req.body.beschreibung,
            dauertage: req.body.dauertage,
            anforderungen: req.body.anforderungen,
            firma: req.body.firma,
            gehalt: req.body.gehalt,
        }
        const success = await praktikaService.updatePraktikum(praktikum);
        if(success){
            await unit.complete(true);
            res.sendStatus(StatusCodes.OK);
        }
        else{
            await unit.complete(false);
            res.sendStatus(StatusCodes.NOT_FOUND);
        }
    }
    catch (e) {
        console.log(e);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    finally {
        await unit.complete();
    }
}).delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const unit: Unit = await Unit.create(false);
    const praktikaService: PraktikumService = new PraktikumService(unit);
    try {
        const success = await praktikaService.delete(id);
        if (success) {
            await unit.complete(true);
            res.sendStatus(StatusCodes.OK);
        } else {
            await unit.complete(false);
            res.sendStatus(StatusCodes.NOT_FOUND);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete();
    }
});

export default router;