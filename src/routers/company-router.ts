// @ts-ignore
import express, {Request, Response, Router} from 'express';
import {Unit} from "../unit";
import {StatusCodes} from "http-status-codes";
import {StudentService} from "../services/student-service";
import {CompanyService} from "../services/company-service";
import {InternshipService} from "../services/internship-service";
import {ICompany, IStudent} from "../models/model";

const router: Router = express.Router();
router.get('/', async (_: Request, res: Response) => {
    const unit: Unit = await Unit.create(true);
    try {
        const service: CompanyService = new CompanyService(unit);
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
        const service: CompanyService = new CompanyService(unit);
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

router.post('/', async (req: Request, res: Response) => {
    const unit: Unit = await Unit.create(false);
    const firmaService: CompanyService = new CompanyService(unit);


    const firma: ICompany = {
        name: req.body.name,
        email: req.body.email,
        passwort: req.body.passwort,
        beschreibung: req.body.beschreibung,
        addresse: req.body.adresse,
        telefon: req.body.telefon
    };

    let companyGeneratedId: number|null = null;

    try {
        let success = false;

        if(await (await firmaService.getAll()).find(s => s.email === firma.email)){
            res.status(StatusCodes.NOT_ACCEPTABLE).send(true);
            return;
        }else {
            let [success1, generatedID] = await firmaService.insert(firma);
            success = success1;
            companyGeneratedId = generatedID;
        }
        if (success) {
            await unit.complete(true);
            res.status(StatusCodes.CREATED).send(true);
        } else {
            await unit.complete(false);
            res.status(StatusCodes.NOT_FOUND).send(true);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete(false);
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const unit: Unit = await Unit.create(false);
    const firmaService: CompanyService = new CompanyService(unit);

    const firma: ICompany = {
        id: id,
        name: req.body.name,
        email: req.body.email,
        passwort: req.body.passwort,
        beschreibung: req.body.beschreibung,
        addresse: req.body.adresse,
        telefon: req.body.telefon
    };

    try {
        const success = await firmaService.update(firma);
        if (success) {
            await unit.complete(true);
            res.status(StatusCodes.OK).send(true);
        } else {
            await unit.complete(false);
            res.status(StatusCodes.NOT_FOUND).send(true);
        }
    } catch (e) {
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(true);
    } finally {
        await unit.complete(false);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    const unit: Unit = await Unit.create(false);
    try {
        const service: CompanyService = new CompanyService(unit);
        const firma: ICompany | null = await service.getById(id);

        if (firma === null) {
            res.sendStatus(StatusCodes.NOT_FOUND);
        } else {
            const success = await service.delete(id);

            if (success) {
                await unit.complete(true);
                res.status(StatusCodes.OK).send(true)
            } else {
                await unit.complete(false);
                res.status(StatusCodes.BAD_REQUEST).send(false);
            }
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete();
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
        const service: CompanyService = new CompanyService(unit);
        const firma: ICompany | null = await service.login(email, passwort);

        if (firma === null) {
            res.sendStatus(StatusCodes.NOT_ACCEPTABLE);
        } else {
            res.status(StatusCodes.OK).json(firma);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete();
    }
});
export default router;