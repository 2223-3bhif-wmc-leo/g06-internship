import { Unit } from "./unit";
import { verbose } from "sqlite3";
import { Database as Driver} from "sqlite3";
import { open, Database } from "sqlite";
import {create} from "domain";

export const dbFileName = 'internship.db';

export class DB {
    public static async createDBConnection(): Promise<Database> {
        const db = await open({
            filename: `./${dbFileName}`,
            driver: Driver
        });
        await this.ensureTablesCreated(db);
        return db;
    }

    public static async beginTransaction(connection: Database): Promise<void> {
        await connection.run('begin transaction;');
    }

    public static async commitTransaction(connection: Database): Promise<void> {
        await connection.run('commit;');
    }

    public static async rollbackTransaction(connection: Database): Promise<void> {
        await connection.run('rollback;');
    }


    private static async ensureTablesCreated(connection: Database): Promise<void> {
    }
}
