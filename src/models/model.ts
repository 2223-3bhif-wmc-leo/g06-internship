export interface IFirma {
    id: number;
    name: string;
    email: string;
    telefon: string;
    praktikum: IPraktikum[];
}

export interface IPraktikum {
    id: number;
    bezeichnung: string;
    beschreibung: string;
    dauertage: number;
    anforderungen: string;
    firma: IFirma;
    schueler: ISchueler[];
}

export interface ISchueler {
    id: number;
    name: string;
    email: string;
    adresse: string;
    telefon: string;
    praktikum: IPraktikum[];
}