import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUtente } from 'app/shared/model/utente.model';
import { UtenteService } from './utente.service';

@Component({
    selector: 'jhi-utente-update',
    templateUrl: './utente-update.component.html'
})
export class UtenteUpdateComponent implements OnInit {
    utente: IUtente;
    isSaving: boolean;

    constructor(protected utenteService: UtenteService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ utente }) => {
            this.utente = utente;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.utente.id !== undefined) {
            this.subscribeToSaveResponse(this.utenteService.update(this.utente));
        } else {
            this.subscribeToSaveResponse(this.utenteService.create(this.utente));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUtente>>) {
        result.subscribe((res: HttpResponse<IUtente>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
