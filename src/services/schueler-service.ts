import {Unit} from "../unit";
import {ServiceBase} from "./service-base";
import {Statement} from "sqlite";
import {ISchueler} from "../models/model";

export class SchulerService extends ServiceBase {
    constructor(unit: Unit) {
        super(unit);
    }
    public async getAll(): Promise<ISchueler[]> {
        const stmt: Statement = await this.unit.prepare(`SELECT *
                                                         FROM Schueler;`);
        return stmt.all<ISchueler[]>()
    }

    public async getById(id: number): Promise<ISchueler | null> {
        const stmt: Statement = await this.unit.prepare('select * from Schueler where id = ?', id);
        const rawResult: ISchueler | null = ServiceBase.nullIfUndefined(await stmt.get<ISchueler>());

        if (rawResult === null) {
            return null;
        }

        return {
            id: rawResult.id,
            name: rawResult.name,
            email: rawResult.email,
            passwort: rawResult.passwort,
            adresse: rawResult.adresse,
            telefon: rawResult.telefon,
        };
    }

    public async update(schueler: ISchueler): Promise<boolean> {
        const stmt = await this.unit.prepare("" +
            'update Schueler set name = ?2, email = ?3, adresse = ?4, telefon =?5, passwort =?6 where id = ?1',
            {
                1: schueler.id,
                2: schueler.name,
                3: schueler.email,
                4: schueler.adresse,
                5: schueler.telefon,
                6: schueler.passwort
            }
        );

        const [success, _] = await this.executeStmt(stmt);
        return success;
    }

    public async insert(schueler: ISchueler): Promise<[boolean, number | null]> {
        const stmt: Statement = await this.unit.prepare('insert into Schueler (id, name, email, adresse, telefon, passwort) values (?1, ?2, ?3, ?4, ?5, ?6)',
            {
                1: schueler.id,
                2: schueler.name,
                3: schueler.email,
                4: schueler.adresse,
                5: schueler.telefon,
                6: schueler.passwort
            }
        );

        return await this.executeStmt(stmt);
    }

    public async delete(id: number): Promise<boolean> {
        const stmt: Statement = await this.unit.prepare('delete from Schueler where id = ?', id);

        const [success, _] = await this.executeStmt(stmt);
        return success;
    }

    public async login(email: string, password: string): Promise<ISchueler | null> {
        const stmt: Statement = await this.unit.prepare('select * from Schueler where email = ?1 and passwort = ?2',
            {
                1: email,
                2: password
            }
        );
        return ServiceBase.nullIfUndefined(await stmt.get<ISchueler>());
    }
}