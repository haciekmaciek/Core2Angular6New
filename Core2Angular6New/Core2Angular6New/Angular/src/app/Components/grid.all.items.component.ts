import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser, User } from '../Model/user';
import { DBOperation } from '../Shared/enum';
import { Global } from '../Shared/global';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';
@Component({
    moduleId: module.id.toString(),
    templateUrl: './grid.all.items.component.html'
  
})

export class GridAllItemsComponent  implements OnInit {
    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    public lastNameSearch: string = "";
    public firstNameSearch: string = "";
    public editDataItem: IUser;
    public isNew: boolean;
    public loading: boolean;
    constructor(private _userService: UserService) { }

    public ngOnInit(): void {
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
        if (!this.isNew)
            this._userService.put(user.Id, user).subscribe(() => this.read(), () => this.read());
        else
            this._userService.post(user).subscribe(() => this.read(), () => this.read());
        this.editDataItem = undefined;
    }

    public removeHandler({ dataItem }) {
        this._userService.delete(dataItem.Id).subscribe(() => this.read(), () => this.read());
    }
    public onSearchClick() {
        this.gridState.skip = 0;
        this.view = this.read();      
    }
   
    private read(): Observable<GridDataResult>  {
        this.loading = true;
        this.view = this._userService.getByName(this.lastNameSearch, this.firstNameSearch, this.gridState)
            .pipe(
          map(response => (<GridDataResult>{
                data: response['Users'],
                total: parseInt(response['UsersCount'])
            })),
            tap(()=> this.loading = false));
        return this.view; 
    }   
}
