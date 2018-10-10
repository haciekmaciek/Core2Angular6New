"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var grid_routing_module_1 = require("./grid.routing.module");
var grid_component_1 = require("./grid.component");
var kendo_angular_grid_1 = require("@progress/kendo-angular-grid");
var kendo_angular_buttons_1 = require("@progress/kendo-angular-buttons");
//import { Shared2Module } from '../Shared/shared.module';
var grid_all_items_component_1 = require("./grid.all.items.component");
var edit_form_component_1 = require("./edit-form.component");
var kendo_angular_dialog_1 = require("@progress/kendo-angular-dialog");
var forms_1 = require("@angular/forms");
var kendo_angular_dropdowns_1 = require("@progress/kendo-angular-dropdowns");
var Grid2Module = /** @class */ (function () {
    function Grid2Module() {
    }
    Grid2Module = __decorate([
        core_1.NgModule({
            imports: [
                kendo_angular_grid_1.GridModule,
                // Shared2Module,
                grid_routing_module_1.Grid2RoutingModule,
                kendo_angular_buttons_1.ButtonsModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                kendo_angular_dialog_1.DialogModule, forms_1.ReactiveFormsModule, kendo_angular_dropdowns_1.DropDownsModule
            ],
            declarations: [grid_component_1.Grid2Component, grid_all_items_component_1.GridAllItemsComponent, edit_form_component_1.GridEditFormComponent],
        })
    ], Grid2Module);
    return Grid2Module;
}());
exports.Grid2Module = Grid2Module;
