"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var GridEditFormComponent = /** @class */ (function () {
    function GridEditFormComponent() {
        this.active = false;
        this.genderItems = ["Male", "Female"];
        this.defaultItem = { text: "Select item...", value: null };
        this.editForm = new forms_1.FormGroup({
            'Id': new forms_1.FormControl(),
            'FirstName': new forms_1.FormControl('', forms_1.Validators.required),
            'LastName': new forms_1.FormControl(0),
            'Gender': new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.isNew = false;
        this.cancel = new core_1.EventEmitter();
        this.save = new core_1.EventEmitter();
    }
    Object.defineProperty(GridEditFormComponent.prototype, "model", {
        set: function (user) {
            this.editForm.reset(user);
            this.active = user !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    GridEditFormComponent.prototype.onSave = function (e) {
        e.preventDefault();
        this.save.emit(this.editForm.value);
        this.active = false;
    };
    GridEditFormComponent.prototype.onCancel = function (e) {
        e.preventDefault();
        this.closeForm();
    };
    GridEditFormComponent.prototype.closeForm = function () {
        this.active = false;
        this.cancel.emit();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], GridEditFormComponent.prototype, "isNew", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], GridEditFormComponent.prototype, "model", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridEditFormComponent.prototype, "cancel", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridEditFormComponent.prototype, "save", void 0);
    GridEditFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id.toString(),
            selector: 'kendo-grid-edit-form',
            styles: [
                'input[type=text] { width: 100%; }'
            ],
            templateUrl: './edit-form.component.html'
        })
    ], GridEditFormComponent);
    return GridEditFormComponent;
}());
exports.GridEditFormComponent = GridEditFormComponent;
