/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ZanichelliTestModule } from '../../../test.module';
import { UtenteComponent } from 'app/entities/utente/utente.component';
import { UtenteService } from 'app/entities/utente/utente.service';
import { Utente } from 'app/shared/model/utente.model';

describe('Component Tests', () => {
    describe('Utente Management Component', () => {
        let comp: UtenteComponent;
        let fixture: ComponentFixture<UtenteComponent>;
        let service: UtenteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ZanichelliTestModule],
                declarations: [UtenteComponent],
                providers: []
            })
                .overrideTemplate(UtenteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UtenteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtenteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Utente(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.utentes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
