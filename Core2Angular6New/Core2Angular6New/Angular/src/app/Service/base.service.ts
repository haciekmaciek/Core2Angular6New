import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators'
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Inject } from '@angular/core';

export class BaseService<T> {
  
    public baseUrl: string;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor(public _http: HttpClient, private url: string) { this.baseUrl = url; }

    get(): Observable<T[]> {
        return this._http.get<T[]>(this.baseUrl)
            .pipe(catchError(this.handleError));
    }

    post(model: T): Observable<any> {
        return this._http.post(this.baseUrl, model, this.httpOptions)
          .pipe(catchError(this.handleError));
    }

    put(id: number, model: T): Observable<any> {
        return this._http.put(this.baseUrl + id, model, this.httpOptions)
          .pipe(catchError(this.handleError));
    }

    delete(id: number): Observable<any> {
        return this._http.delete(this.baseUrl + id, this.httpOptions)
          .pipe(catchError(this.handleError));
    }

    public handleError(error: HttpErrorResponse) {
        console.error(error);
        return throwError(error);
    }

}
