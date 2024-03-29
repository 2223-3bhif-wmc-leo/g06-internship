import {Unit} from "../unit";
import {ServiceBase} from "./service-base";
import {Statement} from "sqlite";
import {IStudent} from "../models/model";

export class StudentService extends ServiceBase {
    constructor(unit: Unit) {
        super(unit);
    }
    public async getAll(): Promise<IStudent[]> {
        const stmt: Statement = await this.unit.prepare(`SELECT *
                                                         FROM Schueler;`);
        return stmt.all<IStudent[]>()
    }

    public async getById(id: number): Promise<IStudent | null> {
        const stmt: Statement = await this.unit.prepare('select * from Schueler where id = ?', id);
        const rawResult: IStudent | null = ServiceBase.nullIfUndefined(await stmt.get<IStudent>());

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

    public async update(schueler: IStudent): Promise<boolean> {
        const stmt = await this.unit.prepare("" +
            'update Schueler set name = ?2, email = ?3, adresse = ?4, telefon = ?5, passwort = ?6 where id = ?1',
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

    public async insert(schueler: IStudent): Promise<[boolean, number | null]> {
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

    public async login(email: string, password: string): Promise<IStudent | null> {
        const stmt: Statement = await this.unit.prepare('select * from Schueler where email = ?1 and passwort = ?2',
            {
                1: email,
                2: password
            }
        );
        return ServiceBase.nullIfUndefined(await stmt.get<IStudent>());
    }

    public async getSchuelerByPraktikumId(praktikumId: number): Promise<IStudent[]> {
        const stmt: Statement = await this.unit.prepare('select * from schueler where id in (select schueler from Bewerber where praktikum = ?1)',praktikumId);
        return stmt.all<IStudent[]>();
    }
}