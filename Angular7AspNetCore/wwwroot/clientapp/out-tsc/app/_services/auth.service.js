var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
var TokenName = 'token';
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.baseUrl = environment.apiUrl + 'auth/';
        this.jwtHelper = new JwtHelperService();
    }
    Object.defineProperty(AuthService.prototype, "tokenId", {
        get: function () {
            if (!this.decodedToken) {
                return null;
            }
            return this.decodedToken.nameid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "tokenUsername", {
        get: function () {
            if (!this.decodedToken) {
                return null;
            }
            return this.decodedToken.unique_name;
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.login = function (model) {
        var _this = this;
        var url = this.baseUrl + "login";
        return this.http.post(url, model)
            .pipe(map(function (response) {
            var user = response;
            if (user) {
                localStorage.setItem(TokenName, user.token);
                _this.decodedToken = _this.jwtHelper.decodeToken(user.token);
            }
        }));
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem(TokenName);
    };
    AuthService.prototype.isLoggedIn = function () {
        var token = this.getToken();
        if (!token) {
            return false;
        }
        var isLoggedIn = !this.jwtHelper.isTokenExpired(token);
        return isLoggedIn;
    };
    AuthService.prototype.getToken = function () {
        return localStorage.getItem(TokenName);
    };
    AuthService.prototype.recheckToken = function () {
        var token = this.getToken();
        if (!token) {
            return;
        }
        this.decodedToken = this.jwtHelper.decodeToken(token);
    };
    AuthService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map