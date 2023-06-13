import {ServiceBase} from "./service-base";
import {IApplication, IInternship} from "../models/model";
import {Unit} from "../unit";

export class ApplicantService extends ServiceBase {

    constructor(unit: Unit) {
        super(unit);
    }

    public async getAll(): Promise<IApplication[]> {
        const stmt = await this.unit.prepare("select * from Bewerber");
        return await stmt.all<IApplication[]>();
    }

    public async getById(id: number): Promise<IApplication | null> {
        const stmt = await this.unit.prepare("select * from Bewerber where id = ?", id);
        return ServiceBase.nullIfUndefined(await stmt.get<(IApplication)>());
    }

    public async update(bewerber: IApplication): Promise<boolean> {
        const stmt = await this.unit.prepare('update Bewerber set praktikum = ?2, schueler = ?3, bewerbungFileName = ?4 where id = ?1',
            {
                1: bewerber.id,
                2: bewerber.praktikumId,
                3: bewerber.schuelerId,
                4: bewerber.bewerbungFileName
            }
        );
        const [success, _] = await this.executeStmt(stmt);
        return success;
    }

    public async insert(bewerber: IApplication): Promise<boolean> {
        const stmt = await this.unit.prepare('insert into Bewerber (praktikum, schueler, bewerbungFileName) values (?1, ?2, ?3)',
            {
                1: bewerber.praktikumId,
                2: bewerber.schuelerId,
                3: bewerber.bewerbungFileName
            }
        );
        const [success, _] = await this.executeStmt(stmt);
        return success;
    }

    public async delete(id: number): Promise<boolean> {
        const stmt = await this.unit.prepare('delete from Bewerber where id = ?', id);
        const [success, _] = await this.executeStmt(stmt);
        return success;
    }

    public async getPraktikaByStudentId(schuelerId: number): Promise<IInternship[]> {
        const stmt = await this.unit.prepare('select * from Praktikum where id in (select praktikum from Bewerber where schueler = ?)', schuelerId);
        return await stmt.all<IInternship[]>();
    }
}
