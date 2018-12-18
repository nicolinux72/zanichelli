export interface IUtente {
    id?: number;
    nome?: string;
    cognome?: string;
    email?: string;
}

export class Utente implements IUtente {
    constructor(public id?: number, public nome?: string, public cognome?: string, public email?: string) {}
}
