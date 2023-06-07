import {Unit} from "../unit";
import {ServiceBase} from "./service-base";
import {Statement} from "sqlite";
import {IFirma, IPraktikum} from "../models/model";

export class PraktikumService extends ServiceBase {
    constructor(unit: Unit) {
        super(unit);
    }

    public async updatePraktikum(praktikum : IPraktikum) : Promise<boolean>{
        const stmt = await this.unit.prepare("" +
            `update Praktikum set  
                titel = ?1,  
                beschreibung = ?2, 
                dauertage = ?3,  
                anforderungen = ?4, 
                firma = ?5,  
                anmeldungsdatum = ?6
                where id = ?7`,
    {
                    1: praktikum.titel,
                    2: praktikum.beschreibung,
                    3: praktikum.dauertage,
                    4: praktikum.firma,
                    5: praktikum.schueler,
                    6: praktikum.anmeldungsdatum,
                    7: praktikum.id

                }
        );
        const [success, _] = await this.executeStmt(stmt);
        return success;
    }

    public async insertPraktikum(praktikum : IPraktikum) : Promise<boolean>{
        const stmt = await this.unit.prepare(
            "insert into Praktikum (titel, beschreibung, dauertage, anforderungen, firma,schueler, anmeldungsdatum) values (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
            {
                1: praktikum.titel,
                2: praktikum.beschreibung,
                3: praktikum.dauertage,
                4: praktikum.anforderungen,
                5: praktikum.firma,
                6: praktikum.schueler,
                7: praktikum.anmeldungsdatum
            }
        );
        const [success, _] = await this.executeStmt(stmt);
        return success;
    }

    public async getPraktikumById(id: number) : Promise<IPraktikum | null> {
        const stmt = await this.unit.prepare(
            "select * from Praktikum where id = ?1", id);
        return ServiceBase.nullIfUndefined(await stmt.get<IPraktikum>());
    }

    public async delete(id: number) : Promise<boolean> {
        const stmt = await  this.unit.prepare(
            "delete from Praktikum where id = ?1;", id
        );

        const [success, _] = await this.executeStmt(stmt);
        return success;
    }

    public async getPraktikaOfFirma(firmenId : number): Promise<IPraktikum[]> {
        const stmt = await this.unit.prepare(
            "select * from Praktikum where firma = ?1", firmenId);
        return stmt.all<IPraktikum[]>();
    }

    public async getPraktikenOfSchueler(schuelerId : number): Promise<IPraktikum[]> {
        const stmt = await this.unit.prepare(
            "select * from Praktikum where schueler = ?1", schuelerId);
        return stmt.all<IPraktikum[]>();
    }
}