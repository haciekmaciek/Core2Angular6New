import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser, User, SearchUser } from '../Model/user';
import { DBOperation } from '../Shared/enum';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { EditService } from '../Service/edit-service';
@Component({
    moduleId: module.id.toString(),
    templateUrl: './grid.component.html'
 
})

export class Grid2Component implements OnInit {
    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    public searchUser: SearchUser = new SearchUser();
    public editDataItem: IUser;
    public isNew: boolean;
    public searchVisibility: boolean = true;
    constructor(private editService: EditService) {
      editService.searchUser = this.searchUser;
    }

    public ngOnInit(): void {
      this.view = this.editService.pipe(map(data => process(data, this.gridState)));
     // this.editService.read();
    }
    public onStateChange(state: State) {
        this.gridState = state;
        this.editService.read();
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
      this.editService.save(user, this.isNew);
      this.editDataItem = undefined;
    }

    public removeHandler({ dataItem }) {
      this.editService.reset();
      this.editService.remove(dataItem);
    }

    public onSearchClick() {
        this.gridState.skip = 0;
        this.editService.reset();
        this.editService.read();
        this.searchVisibility = false;
    }

    public onBackSearchClick() {
      this.searchVisibility = true;
    }
}
