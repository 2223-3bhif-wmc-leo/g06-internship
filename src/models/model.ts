export interface IFirma {
    id: number;
    name: string;
    email: string;
    telefon: string;
    beschreibung: string;
    addresse: string;
    passwort: string;
}

export interface IPraktikum {
    id?: number;
    titel: string;
    beschreibung: string;
    dauertage: number;
    anforderungen: string;
    firma: IFirma;
    schueler: ISchueler;
    anmeldungsdatum: Date;
}

export interface ISchueler {
    id: number;
    name: string;
    email: string;
    passwort: string;
    adresse: string;
    telefon: string;
}