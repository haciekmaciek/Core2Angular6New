import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import {catchError} from 'rxjs/operators'
import { BaseService} from './base.service';
import { HttpClient } from '@angular/common/http';
import { User, IUser } from '../Model/user';
import { toODataString } from '@progress/kendo-data-query';
import { APP_BASE_HREF } from '@angular/common';

@Injectable()
export class UserService extends BaseService<IUser> {
    constructor(_http: HttpClient, @Inject(APP_BASE_HREF) baseHref: string) { super(_http, baseHref+'api/UserAPI/'); }
    getByName(lastName: string, firstName: string, state: any): Observable<IUser[]> {
        const queryStr = toODataString(state).split('$').join('') + '&count=true';
        console.log("query:" + queryStr)
        return this._http.get<IUser[]>(this.baseUrl + 'Search?lastName=' + lastName + '&firstName=' + firstName + "&" + queryStr)
            .pipe(catchError(this.handleError));
    }
    getByFirstLastName(lastName: string, firstName: string): Observable<IUser[]> {
        return this._http.get<IUser[]>(this.baseUrl + 'SearchAll?lastName=' + lastName + '&firstName=' + firstName)
            .pipe(catchError(this.handleError));
    }
}

