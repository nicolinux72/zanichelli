import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUtente } from 'app/shared/model/utente.model';

@Component({
    selector: 'jhi-utente-detail',
    templateUrl: './utente-detail.component.html'
})
export class UtenteDetailComponent implements OnInit {
    utente: IUtente;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ utente }) => {
            this.utente = utente;
        });
    }

    previousState() {
        window.history.back();
    }
}
