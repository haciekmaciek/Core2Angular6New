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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var tap_1 = require("rxjs/operators/tap");
var map_1 = require("rxjs/operators/map");
var user_service_1 = require("./user.service");
var CREATE_ACTION = 'create';
var UPDATE_ACTION = 'update';
var REMOVE_ACTION = 'destroy';
var EditService = /** @class */ (function (_super) {
    __extends(EditService, _super);
    function EditService(_userService) {
        var _this = _super.call(this, []) || this;
        _this._userService = _userService;
        _this.data = [];
        return _this;
    }
    EditService.prototype.read = function (lastName, firstName) {
        var _this = this;
        if (this.data.length) {
            return _super.prototype.next.call(this, this.data);
        }
        this.loading = true;
        this.searchByName(lastName, firstName)
            .pipe(tap_1.tap(function (data) {
            _this.data = data;
            _this.loading = false;
        }))
            .subscribe(function (data) {
            _super.prototype.next.call(_this, data);
        });
    };
    EditService.prototype.save = function (data, lastName, firstName, isNew) {
        var _this = this;
        var action = isNew ? CREATE_ACTION : UPDATE_ACTION;
        this.reset();
        if (!isNew)
            this._userService.put(data.Id, data).subscribe(function () { return _this.read(lastName, firstName); }, function () { return _this.read(lastName, firstName); });
        else
            this._userService.post(data).subscribe(function () { return _this.read(lastName, firstName); }, function () { return _this.read(lastName, firstName); });
        //this.fetch(action, data)
        //    .subscribe(() => this.read(), () => this.read());
    };
    EditService.prototype.remove = function (data, lastName, firstName) {
        var _this = this;
        this.reset();
        this._userService.delete(data.Id).subscribe(function () { return _this.read(lastName, firstName); }, function () { return _this.read(lastName, firstName); });
        //this.fetch(REMOVE_ACTION, data)
        //    .subscribe(() => this.read(), () => this.read());
    };
    EditService.prototype.resetItem = function (dataItem) {
        if (!dataItem) {
            return;
        }
        // find orignal data item
        var originalDataItem = this.data.find(function (item) { return item.ProductID === dataItem.ProductID; });
        // revert changes
        Object.assign(originalDataItem, dataItem);
        _super.prototype.next.call(this, this.data);
    };
    EditService.prototype.reset = function () {
        this.data = [];
    };
    EditService.prototype.loadUsers = function () {
        return this._userService.get()
            .pipe(map_1.map(function (res) { return res; }));
    };
    EditService.prototype.searchByName = function (lastName, firstName) {
        return this._userService.get()
            .pipe(map_1.map(function (res) { return res; }));
    };
    EditService.prototype.serializeModels = function (data) {
        return data ? '&models=${JSON.stringify([data])}' : '';
    };
    EditService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], EditService);
    return EditService;
}(BehaviorSubject_1.BehaviorSubject));
exports.EditService = EditService;
