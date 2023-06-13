import {Unit} from "../unit";
import {ServiceBase} from "./service-base";
import {Statement} from "sqlite";
import {IFirma} from "../models/model";

export class FirmenService extends ServiceBase {
    constructor(unit: Unit) {
        super(unit);
    }

    public async getAll(): Promise<IFirma[]> {
        const stmt = await this.unit.prepare("select * from Firma");
        return await stmt.all<IFirma[]>();
    }

    public async getById(id: number): Promise<IFirma | null> {
        const stmt = await this.unit.prepare("select * from Firma where id = ?", id);
        const rawResult: IFirma | null = ServiceBase.nullIfUndefined(await stmt.get<(IFirma)>());

        return rawResult === null ? null : {
            id: rawResult.id,
            name: rawResult.name,
            email: rawResult.email,
            telefon: rawResult.telefon,
            passwort: rawResult.passwort,
            addresse: rawResult.addresse,
            beschreibung: rawResult.beschreibung
        };
    }

    public async update(firma: IFirma): Promise<boolean> {
        const stmt = await this.unit.prepare("" +
            'update Firma set name = ?2, email = ?3, telefon = ?4, addresse =?5, beschreibung =?6, passwort=?7 where id = ?1',
            {
                1: firma.id,
                2: firma.name,
                3: firma.email,
                4: firma.telefon,
                5: firma.addresse,
                6: firma.beschreibung,
                7: firma.passwort
            }
        );

        const [success, _] = await this.executeStmt(stmt);
        return success;
    }

    public async insert(firma: IFirma): Promise<[boolean, number|null]> {
        const stmt = await this.unit.prepare(
            "insert into Firma (name, email, passwort, beschreibung, addresse, telefon) values (?1, ?2, ?3, ?4, ?5, ?6)",
            {
                1: firma.name,
                2: firma.email,
                3: firma.passwort,
                4: firma.beschreibung,
                5: firma.addresse,
                6: firma.telefon
            }
        );

        return await this.executeStmt(stmt);
    }

    public async delete(id: number): Promise<boolean> {
        const stmt: Statement = await this.unit.prepare('delete from Firma where id = ?', id);
        const [success, _] = await this.executeStmt(stmt);
        return success;
    }

    public async login(email: string, passwort: string): Promise<IFirma | null> {
        const stmt = await this.unit.prepare("select * from Firma where email = ?1 and passwort = ?2", {
            1: email,
            2: passwort
        });
        const rawResult: IFirma | null = ServiceBase.nullIfUndefined(await stmt.get<(IFirma)>());

        return rawResult === null ? null : {
            id: rawResult.id,
            name: rawResult.name,
            email: rawResult.email,
            telefon: rawResult.telefon,
            passwort: rawResult.passwort,
            addresse: rawResult.addresse,
            beschreibung: rawResult.beschreibung
        };
    }
}