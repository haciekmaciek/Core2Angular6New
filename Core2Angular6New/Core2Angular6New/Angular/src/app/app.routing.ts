import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { UserComponent } from './Components/user.component';
import { HomeComponent } from './Components/home.component';
import { NotfoundComponent } from './Shared/notfound.component';
//import { Grid2Component } from './Components/grid.component';
//import { GridAllItemsComponent } from './Components/grid.all.items.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'user', component: UserComponent },
    //{ path: 'grid2', component: Grid2Component },
    //{ path: 'grid3', component: GridAllItemsComponent },
    {
        path: 'grid2', loadChildren: './Components/grid.module#Grid2Module' 
    },
    { path: "**", component: NotfoundComponent }
    //{ path: 'grid3', loadChildren: '../app/Components/grid.all.items.module#GridAllItemsModule' }

];

//export const routing: ModuleWithProviders =
//    RouterModule.forRoot(appRoutes);

export const routing: ModuleWithProviders =
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules });
