"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/catch");
var http_1 = require("@angular/common/http");
var BaseService = /** @class */ (function () {
    function BaseService(_http, url) {
        this._http = _http;
        this.url = url;
        this.httpOptions = {
            headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
        };
        this.baseUrl = url;
    }
    BaseService.prototype.get = function () {
        return this._http.get(this.baseUrl)
            .catch(this.handleError);
    };
    BaseService.prototype.post = function (model) {
        return this._http.post(this.baseUrl, model, this.httpOptions)
            .catch(this.handleError);
    };
    BaseService.prototype.put = function (id, model) {
        return this._http.put(this.baseUrl + id, model, this.httpOptions)
            .catch(this.handleError);
    };
    BaseService.prototype.delete = function (id) {
        return this._http.delete(this.baseUrl + id, this.httpOptions)
            .catch(this.handleError);
    };
    BaseService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error);
    };
    return BaseService;
}());
exports.BaseService = BaseService;
