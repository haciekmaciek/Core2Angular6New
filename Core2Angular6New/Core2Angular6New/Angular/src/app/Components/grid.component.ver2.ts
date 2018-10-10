import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser, User } from '../Model/user';
import { DBOperation } from '../Shared/enum';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { EditService } from '../Service/edit-service';
const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';
@Component({
    moduleId: module.id.toString(),
    templateUrl: './grid.component.html'
 
})

export class Grid3Component extends BehaviorSubject<any[]> implements OnInit {
    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    private data: IUser[] = [];
    msg: string;
    aaa: string;
    public lastNameSearch: string = "";
    public firstNameSearch: string = "";
    public editDataItem: IUser;
    public isNew: boolean;
    public searchVisibility: boolean = true;
 
    public loading: boolean;
    constructor(private _userService: UserService) {
        super([]);
    }

    public ngOnInit(): void {
        this.view = this.pipe(map(data => process(data, this.gridState)));
        this.read();
    }
    public onStateChange(state: State) {
        this.gridState = state;
        this.read();
    }

    public addHandler() {
        this.editDataItem = new User();
        this.isNew = true;
    }

    public editHandler({ dataItem }) {
        this.editDataItem = dataItem;
        this.isNew = false;
    }

    public cancelHandler() {
        this.editDataItem = undefined;
    }

    public saveHandler(user: IUser) {
        const action = this.isNew ? CREATE_ACTION : UPDATE_ACTION;
        this.reset();
        if (!this.isNew)
            this._userService.put(user.Id, user).subscribe(() => this.read(), () => this.read());
        else
            this._userService.post( user).subscribe(() => this.read(), () => this.read());

        this.editDataItem = undefined;
    }

    public removeHandler({ dataItem }) {
        this.reset();
        this._userService.delete(dataItem.Id).subscribe(() => this.read(), () => this.read());
    }
    public onSearchClick() {
        this.gridState.skip = 0;
        this.reset();
        this.read();
        this.searchVisibility = false;
    }
    public onBackSearchClick() {
      this.searchVisibility = true;
    }

    private read() {
        if (this.data.length) {
            return super.next(this.data);
        }
        this.loading = true;
        this._userService.getByFirstLastName(this.lastNameSearch, this.firstNameSearch)
            .pipe(
            tap(data => {
                this.data = data; this.loading = false; 
            })
            )
            .subscribe(data => {
                super.next(data);
            });
    }

    public reset() {
        this.data = [];
    }      
}
