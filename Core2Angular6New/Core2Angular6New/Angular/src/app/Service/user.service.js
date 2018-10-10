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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/catch");
var base_service_1 = require("./base.service");
var http_1 = require("@angular/common/http");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var common_1 = require("@angular/common");
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    function UserService(_http, baseHref) {
        return _super.call(this, _http, baseHref + 'api/UserAPI/') || this;
    }
    UserService.prototype.getByName = function (lastName, firstName, state) {
        var queryStr = kendo_data_query_1.toODataString(state).split('$').join('') + '&count=true';
        console.log("query:" + queryStr);
        return this._http.get(this.baseUrl + 'Search?lastName=' + lastName + '&firstName=' + firstName + "&" + queryStr)
            .catch(this.handleError);
    };
    UserService.prototype.getByFirstLastName = function (lastName, firstName) {
        return this._http.get(this.baseUrl + 'SearchAll?lastName=' + lastName + '&firstName=' + firstName)
            .catch(this.handleError);
    };
    UserService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(common_1.APP_BASE_HREF)),
        __metadata("design:paramtypes", [http_1.HttpClient, String])
    ], UserService);
    return UserService;
}(base_service_1.BaseService));
exports.UserService = UserService;
