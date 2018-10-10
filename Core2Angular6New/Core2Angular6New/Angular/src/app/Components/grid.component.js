"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var kendo_data_query_1 = require("@progress/kendo-data-query");
var tap_1 = require("rxjs/operators/tap");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var CREATE_ACTION = 'create';
var UPDATE_ACTION = 'update';
var REMOVE_ACTION = 'destroy';
var Grid2Component = /** @class */ (function (_super) {
    __extends(Grid2Component, _super);
    function Grid2Component(_userService) {
        var _this = _super.call(this, []) || this;
        _this._userService = _userService;
        _this.gridState = {
            sort: [],
            skip: 0,
            take: 10
        };
        _this.data = [];
        _this.lastNameSearch = "";
        _this.firstNameSearch = "";
        return _this;
    }
    Grid2Component.prototype.ngOnInit = function () {
        var _this = this;
        this.view = this.map(function (data) { return kendo_data_query_1.process(data, _this.gridState); });
        this.read();
    };
    Grid2Component.prototype.onStateChange = function (state) {
        this.gridState = state;
        this.read();
    };
    Grid2Component.prototype.addHandler = function () {
        this.editDataItem = new user_1.User();
        this.isNew = true;
    };
    Grid2Component.prototype.editHandler = function (_a) {
        var dataItem = _a.dataItem;
        this.editDataItem = dataItem;
        this.isNew = false;
    };
    Grid2Component.prototype.cancelHandler = function () {
        this.editDataItem = undefined;
    };
    Grid2Component.prototype.saveHandler = function (user) {
        var _this = this;
        var action = this.isNew ? CREATE_ACTION : UPDATE_ACTION;
        this.reset();
        if (!this.isNew)
            this._userService.put(user.Id, user).subscribe(function () { return _this.read(); }, function () { return _this.read(); });
        else
            this._userService.post(user).subscribe(function () { return _this.read(); }, function () { return _this.read(); });
        this.editDataItem = undefined;
    };
    Grid2Component.prototype.removeHandler = function (_a) {
        var _this = this;
        var dataItem = _a.dataItem;
        this.reset();
        this._userService.delete(dataItem.Id).subscribe(function () { return _this.read(); }, function () { return _this.read(); });
    };
    Grid2Component.prototype.onSearchClick = function () {
        this.gridState.skip = 0;
        this.reset();
        this.read();
    };
    Grid2Component.prototype.read = function () {
        var _this = this;
        if (this.data.length) {
            return _super.prototype.next.call(this, this.data);
        }
        this.loading = true;
        this._userService.getByFirstLastName(this.lastNameSearch, this.firstNameSearch)
            .pipe(tap_1.tap(function (data) {
            _this.data = data;
            _this.loading = false;
        }))
            .subscribe(function (data) {
            _super.prototype.next.call(_this, data);
        });
    };
    Grid2Component.prototype.reset = function () {
        this.data = [];
    };
    Grid2Component = __decorate([
        core_1.Component({
            moduleId: module.id.toString(),
            templateUrl: './grid.component.html'
        }),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], Grid2Component);
    return Grid2Component;
}(BehaviorSubject_1.BehaviorSubject));
exports.Grid2Component = Grid2Component;
