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
var user_service_1 = require("../Service/user.service");
var user_1 = require("../Model/user");
var map_1 = require("rxjs/operators/map");
var tap_1 = require("rxjs/operators/tap");
var CREATE_ACTION = 'create';
var UPDATE_ACTION = 'update';
var REMOVE_ACTION = 'destroy';
var GridAllItemsComponent = /** @class */ (function () {
    function GridAllItemsComponent(_userService) {
        this._userService = _userService;
        this.gridState = {
            sort: [],
            skip: 0,
            take: 10
        };
        this.lastNameSearch = "";
        this.firstNameSearch = "";
    }
    GridAllItemsComponent.prototype.ngOnInit = function () {
        this.read();
    };
    GridAllItemsComponent.prototype.onStateChange = function (state) {
        this.gridState = state;
        this.read();
    };
    GridAllItemsComponent.prototype.addHandler = function () {
        this.editDataItem = new user_1.User();
        this.isNew = true;
    };
    GridAllItemsComponent.prototype.editHandler = function (_a) {
        var dataItem = _a.dataItem;
        this.editDataItem = dataItem;
        this.isNew = false;
    };
    GridAllItemsComponent.prototype.cancelHandler = function () {
        this.editDataItem = undefined;
    };
    GridAllItemsComponent.prototype.saveHandler = function (user) {
        var _this = this;
        var action = this.isNew ? CREATE_ACTION : UPDATE_ACTION;
        if (!this.isNew)
            this._userService.put(user.Id, user).subscribe(function () { return _this.read(); }, function () { return _this.read(); });
        else
            this._userService.post(user).subscribe(function () { return _this.read(); }, function () { return _this.read(); });
        this.editDataItem = undefined;
    };
    GridAllItemsComponent.prototype.removeHandler = function (_a) {
        var _this = this;
        var dataItem = _a.dataItem;
        this._userService.delete(dataItem.Id).subscribe(function () { return _this.read(); }, function () { return _this.read(); });
    };
    GridAllItemsComponent.prototype.onSearchClick = function () {
        this.gridState.skip = 0;
        this.view = this.read();
    };
    GridAllItemsComponent.prototype.read = function () {
        var _this = this;
        this.loading = true;
        this.view = this._userService.getByName(this.lastNameSearch, this.firstNameSearch, this.gridState)
            .pipe(map_1.map(function (response) { return ({
            data: response['Users'],
            total: parseInt(response['UsersCount'])
        }); }), tap_1.tap(function () { return _this.loading = false; }));
        return this.view;
    };
    GridAllItemsComponent = __decorate([
        core_1.Component({
            moduleId: module.id.toString(),
            templateUrl: './grid.component.html'
        }),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], GridAllItemsComponent);
    return GridAllItemsComponent;
}());
exports.GridAllItemsComponent = GridAllItemsComponent;
