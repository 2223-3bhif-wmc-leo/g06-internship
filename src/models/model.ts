export interface IFirma {
    id: number;
    name: string;
    email: string;
    telefon: string;
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
    adresse: string;
    telefon: string;
}