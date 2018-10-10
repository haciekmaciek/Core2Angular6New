import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grid2RoutingModule } from './grid.routing.module';
import { Grid2Component } from './grid.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
//import { Shared2Module } from '../Shared/shared.module';
import { GridAllItemsComponent } from './grid.all.items.component';
import { GridEditFormComponent } from './edit-form.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { EditService } from '../Service/edit-service';

@NgModule({
    imports: [
        GridModule,
       // Shared2Module,
        Grid2RoutingModule,
        ButtonsModule,
        FormsModule,
        CommonModule,
      DialogModule, ReactiveFormsModule, DropDownsModule
    ],
    declarations: [Grid2Component, GridAllItemsComponent, GridEditFormComponent],
    providers: [ EditService],
})
export class Grid2Module { }
