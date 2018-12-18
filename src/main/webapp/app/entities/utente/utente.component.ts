import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUtente } from 'app/shared/model/utente.model';
import { AccountService } from 'app/core';
import { UtenteService } from './utente.service';

@Component({
    selector: 'jhi-utente',
    templateUrl: './utente.component.html'
})
export class UtenteComponent implements OnInit, OnDestroy {
    utentes: IUtente[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected utenteService: UtenteService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.utenteService.query().subscribe(
            (res: HttpResponse<IUtente[]>) => {
                this.utentes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUtentes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUtente) {
        return item.id;
    }

    registerChangeInUtentes() {
        this.eventSubscriber = this.eventManager.subscribe('utenteListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
