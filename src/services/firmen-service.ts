import {Unit} from "../unit";
import {ServiceBase} from "./service-base";
import {Statement} from "sqlite";
import {IFirma, ISchueler} from "../models/model";

export class FirmenService extends ServiceBase {
    constructor(unit: Unit) {
        super(unit);
    }

    // TODO: Implementieren Sie hier die Methoden für die Firmen-Entität

    public async getAll():Promise<IFirma[]>{
        const stmt = await this.unit.prepare("select * from Firma");
        return await stmt.all<IFirma[]>();
    }

    public async getById(id: number): Promise<IFirma>{
        const stmt = await this.unit.prepare("select * from Firma where id = ?", id);
        const rawResult: ISchueler | null = ServiceBase.nullIfUndefined(await stmt.get<ISchueler>());


        return rawResult === null ? null : {
            id: id,
            name: rawResult.name,
            email: rawResult.email,
            telefon: rawResult.telefon
        };
    }

    public async update(firma: IFirma): Promise<boolean> {
        const stmt: Statement = await this.unit.prepare('update Firma set name = ?2, email = ?3, telefon = ?4 where id = ?1',
            {
                1: firma.id,
                2: firma.name,
                3: firma.email,
                4: firma.telefon
            }
        );

        const [success, _] = await this.executeStmt(stmt);
        return success;
    }

    public async insert(firma: IFirma): Promise<boolean> {
        const stmt: Statement = await this.unit.prepare('insert into Firma (id, name, email, telefon) values (?1, ?2, ?3, ?4)',
            {
                1: firma.id,
                2: firma.name,
                3: firma.email,
                4: firma.telefon
            }
        );

        const [success, _] = await this.executeStmt(stmt);
        return success;
    }

    public async delete(id: number): Promise<boolean> {
        const stmt: Statement = await this.unit.prepare('delete from Firma where id = ?', id);
        const [success, _] = await this.executeStmt(stmt);
        return success;
    }
}