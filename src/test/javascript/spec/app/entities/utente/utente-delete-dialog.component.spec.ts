/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ZanichelliTestModule } from '../../../test.module';
import { UtenteDeleteDialogComponent } from 'app/entities/utente/utente-delete-dialog.component';
import { UtenteService } from 'app/entities/utente/utente.service';

describe('Component Tests', () => {
    describe('Utente Management Delete Component', () => {
        let comp: UtenteDeleteDialogComponent;
        let fixture: ComponentFixture<UtenteDeleteDialogComponent>;
        let service: UtenteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ZanichelliTestModule],
                declarations: [UtenteDeleteDialogComponent]
            })
                .overrideTemplate(UtenteDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UtenteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtenteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
