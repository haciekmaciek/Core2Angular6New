"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var user_component_1 = require("./components/user.component");
var home_component_1 = require("./components/home.component");
var notfound_component_1 = require("./Shared/notfound.component");
//import { Grid2Component } from './components/grid.component';
//import { GridAllItemsComponent } from './components/grid.all.items.component';
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'user', component: user_component_1.UserComponent },
    //{ path: 'grid2', component: Grid2Component },
    //{ path: 'grid3', component: GridAllItemsComponent },
    {
        path: 'grid2', loadChildren: '../src/app/Components/grid.module#Grid2Module'
    },
    { path: "**", component: notfound_component_1.NotfoundComponent }
    //{ path: 'grid3', loadChildren: '../app/Components/grid.all.items.module#GridAllItemsModule' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//export const routing: ModuleWithProviders =
//    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules });
//# sourceMappingURL=app.routing.js.map
