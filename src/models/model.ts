export interface IFirma {
    id?: number;
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
    aufgegeben?: string;
    gehalt?: string;
}

export interface ISchueler {
    id?: number;
    name: string;
    email: string;
    passwort: string;
    adresse: string;
    telefon: string;
}

export interface IBewerber {
    id?: number;
    praktikumId: IPraktikum;
    schuelerId: ISchueler;
    bewerbungFileName: string;
}