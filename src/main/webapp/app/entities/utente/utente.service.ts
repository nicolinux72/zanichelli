import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUtente } from 'app/shared/model/utente.model';

type EntityResponseType = HttpResponse<IUtente>;
type EntityArrayResponseType = HttpResponse<IUtente[]>;

@Injectable({ providedIn: 'root' })
export class UtenteService {
    public resourceUrl = SERVER_API_URL + 'api/utentes';

    constructor(protected http: HttpClient) {}

    create(utente: IUtente): Observable<EntityResponseType> {
        return this.http.post<IUtente>(this.resourceUrl, utente, { observe: 'response' });
    }

    update(utente: IUtente): Observable<EntityResponseType> {
        return this.http.put<IUtente>(this.resourceUrl, utente, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUtente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUtente[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
