import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { UserService } from './user.service';
import { Http } from '@angular/http';
import { Global } from '../Shared/global';
import { IUser, SearchUser } from '../Model/user';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

@Injectable()
export class EditService extends BehaviorSubject<any[]> {
  public loading: boolean;
  public searchUser: SearchUser;
    constructor(private userService: UserService) {
        super([]);
    }

    private data: IUser[] = [];
    public read() {
        if (this.data.length) {
            return super.next(this.data);
        }
        this.loading = true;
        this.userService.getByFirstLastName(this.searchUser.LastName, this.searchUser.FirstName)
            .pipe(
            tap(data => {
                this.data = data; this.loading = false;
            })
            )
            .subscribe(data => {
                super.next(data);
            });
    }

    public save(data: IUser, isNew?: boolean) {
        this.reset();
        if (!isNew)
            this.userService.put(data.Id, data).subscribe(() => this.read(), () => this.read());
        else
            this.userService.post(data).subscribe(() => this.read(), () => this.read());
    }

    public remove(data: IUser) {
        this.reset();
        this.userService.delete( data.Id).subscribe(() => this.read(), () => this.read());
    }
    public reset() {
        this.data = [];
    }
}
