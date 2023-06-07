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
        //await DB.ensureSampleDataInserted(db);

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

    public static async ensureSampleDataInserted(connection: Database): Promise<void> {

        await connection.run(`DELETE FROM Firma;`);
        await connection.run(`INSERT INTO Firma (name, email, telefon) VALUES ('HTL Leonding', 'htl@leonding', '+43 54561561');`);


        await connection.run(`DELETE FROM Schueler;`);
        await connection.run(`INSERT INTO Schueler (name, email, adresse, telefon) VALUES ('Fabian Stroschneider', 'f.stro@htl', '4020 Linz', '+43 7867676876786');`);

        await connection.run(`DELETE FROM Praktikum;`);
        await connection.run(`INSERT INTO Praktikum (titel, beschreibung, dauertage, anforderungen, anmeldungsdatum, firma, schueler) VALUES ('Praktikant', 'irgendwas', 30, 'kompetent', '05-07-2023', 1, 1);`);
    }

    // TODO: Add praktikum (see cld)
    private static async ensureTablesCreated(connection: Database): Promise<void> {
        await connection.run(`CREATE TABLE IF NOT EXISTS Firma (
              id        INTEGER   NOT NULL primary key,
              name      TEXT      NOT NULL,
              email     TEXT      NOT NULL,
              telefon   TEXT      NOT NULL
          ) strict`
        );

        await connection.run(`CREATE TABLE IF NOT EXISTS Schueler (
            id        INTEGER   NOT NULL PRIMARY KEY,
            name      TEXT      NOT NULL,
            email     TEXT      NOT NULL,
            adresse   TEXT      NOT NULL,
            telefon   TEXT      NOT NULL
            ) strict`
        );

        await connection.run(`CREATE TABLE IF NOT EXISTS Praktikum (
              id              INTEGER  NOT NULL,
              titel           TEXT     NOT NULL,
              beschreibung    TEXT     NOT NULL,
              dauertage       INTEGER  NOT NULL,
              anforderungen   TEXT     NOT NULL,
              firma           integer    NOT NULL,
              schueler        integer,
              anmeldungsdatum TEXT     NOT NULL,
              constraint fk_praktikum_firma foreign key (firma) references Firma (id) on delete cascade,
              constraint fk_praktikum_schueler foreign key (schueler) references Schueler (id),
              CONSTRAINT PK_Praktikum primary key (id)
          ) strict`
        );
    }
}
