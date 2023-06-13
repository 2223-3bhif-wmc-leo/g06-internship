export interface ICompany {
    id?: number;
    name: string;
    email: string;
    telefon: string;
    beschreibung: string;
    addresse: string;
    passwort: string;
}

export interface IInternship {
    id?: number;
    titel: string;
    beschreibung: string;
    dauertage: number;
    anforderungen: string;
    firma: ICompany;
    aufgegeben?: string;
    gehalt?: string;
}

export interface IStudent {
    id?: number;
    name: string;
    email: string;
    passwort: string;
    adresse: string;
    telefon: string;
}

export interface IApplication {
    id?: number;
    praktikumId: IInternship;
    schuelerId: IStudent;
    bewerbungFileName: string;
}