import {Unit} from "../unit";
import {ServiceBase} from "./service-base";
import {Statement} from "sqlite";
import {ISchueler} from "../models/model";

export class SchulerService extends ServiceBase {
    constructor(unit: Unit) {
        super(unit);
    }

    // TODO: Implementieren Sie hier die Methoden für die Schuler-Entität

    public async getAll(): Promise<ISchueler[]> {
        const stmt: Statement = await this.unit.prepare(`SELECT *
                                                         FROM Schueler;`);
        return stmt.all<ISchueler[]>()
    }
}