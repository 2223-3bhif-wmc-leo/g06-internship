import {Database as Driver} from "sqlite3";
import {open, Database} from "sqlite";

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
        await connection.run(`CREATE TABLE IF NOT EXISTS Firma
                              (
                                  id           INTEGER NOT NULL primary key,
                                  name         TEXT    NOT NULL,
                                  email        TEXT    NOT NULL,
                                  passwort     TEXT    NOT NULL,
                                  beschreibung TEXT    NOT NULL,
                                  addresse     TEXT    NOT NULL,
                                  telefon      TEXT    NOT NULL
                              ) strict`
        );

        await connection.run(`CREATE TABLE IF NOT EXISTS Schueler
                              (
                                  id       INTEGER NOT NULL PRIMARY KEY,
                                  name     TEXT    NOT NULL,
                                  email    TEXT    NOT NULL,
                                  passwort TEXT    NOT NULL,
                                  adresse  TEXT    NOT NULL,
                                  telefon  TEXT    NOT NULL
                              ) strict`
        );

        await connection.run(`CREATE TABLE IF NOT EXISTS Praktikum
                              (
                                  id              INTEGER NOT NULL,
                                  titel           TEXT    NOT NULL,
                                  beschreibung    TEXT    NOT NULL,
                                  dauertage       INTEGER NOT NULL,
                                  anforderungen   TEXT    NOT NULL,
                                  aufgegeben      Text    NULL,
                                  gehalt          TEXT    Null,
                                  firma           integer NOT NULL,
                                  constraint fk_praktikum_firma foreign key (firma) references Firma (id) on delete cascade,
                                  CONSTRAINT PK_Praktikum primary key (id)
                              ) strict`
        );

        await connection.run(`CREATE TABLE IF NOT EXISTS Bewerber
                              (
                                  id        INTEGER NOT NULL,
                                  praktikum INTEGER NOT NULL,
                                  schueler  INTEGER NOT NULL,
                                  bewerbungFileName TEXT NOT NULL,
                                  constraint fk_bewerber_praktikum foreign key (praktikum) references Praktikum (id) on delete cascade,
                                  constraint fk_bewerber_schueler foreign key (schueler) references Schueler (id) on delete cascade,
                                  primary key (id)
                              ) strict`
        );
    }
}
