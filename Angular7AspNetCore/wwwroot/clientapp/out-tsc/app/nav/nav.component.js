var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
var NavComponent = /** @class */ (function () {
    function NavComponent(authService, alertify, router) {
        this.authService = authService;
        this.alertify = alertify;
        this.router = router;
        this.model = {};
        this.isLoggedin = false;
    }
    NavComponent.prototype.ngOnInit = function () {
        this.setLoggedInDetails();
    };
    NavComponent.prototype.login = function () {
        var _this = this;
        this.authService.login(this.model)
            .subscribe(function (next) {
            _this.setLoggedInDetails();
            _this.alertify.success('Logged in successfully');
        }, function (error) {
            _this.alertify.error(error);
        }, function () {
            _this.router.navigate(['/investments']);
        });
    };
    NavComponent.prototype.logout = function () {
        this.authService.logout();
        this.setLoggedInDetails();
        this.alertify.message('Logged out');
        this.router.navigate(['/home']);
    };
    NavComponent.prototype.setLoggedInDetails = function () {
        this.isLoggedin = this.authService.isLoggedIn();
        this.loggedInUsername = this.authService.tokenUsername;
    };
    NavComponent = __decorate([
        Component({
            selector: 'app-nav',
            templateUrl: './nav.component.html',
            styleUrls: ['./nav.component.css']
        }),
        __metadata("design:paramtypes", [AuthService,
            AlertifyService,
            Router])
    ], NavComponent);
    return NavComponent;
}());
export { NavComponent };
//# sourceMappingURL=nav.component.js.map