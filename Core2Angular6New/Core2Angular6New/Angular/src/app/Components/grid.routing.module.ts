import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Grid2Component } from './grid.component';
import { GridAllItemsComponent } from './grid.all.items.component';


const routes: Routes = [
    {
        path: 'test1',
        component: Grid2Component
      
    }, {
    path: 'test2',
    component: GridAllItemsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Grid2RoutingModule { }
