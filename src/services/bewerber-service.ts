import {ServiceBase} from "./service-base";
import {IBewerber} from "../models/model";
import {Unit} from "../unit";

export class BewerberService extends ServiceBase {

    constructor(unit: Unit) {
        super(unit);
    }

    public async getAll(): Promise<IBewerber[]> {
        const stmt = await this.unit.prepare("select * from Bewerber");
        return await stmt.all<IBewerber[]>();
    }

    public async getById(id: number): Promise<IBewerber | null> {
        const stmt = await this.unit.prepare("select * from Bewerber where id = ?", id);
        return ServiceBase.nullIfUndefined(await stmt.get<(IBewerber)>());
    }

    public async update(bewerber: IBewerber): Promise<boolean> {
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

    public async insert(bewerber: IBewerber): Promise<boolean> {
        const stmt = await this.unit.prepare('insert into Bewerber (id, praktikum, schueler, bewerbungFileName) values (?1, ?2, ?3,?4)',
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

    public async delete(id: number): Promise<boolean> {
        const stmt = await this.unit.prepare('delete from Bewerber where id = ?', id);
        const [success, _] = await this.executeStmt(stmt);
        return success;
    }
}
