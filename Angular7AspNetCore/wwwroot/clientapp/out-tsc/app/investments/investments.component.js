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
import { ActivatedRoute } from '@angular/router';
import { InvestmentService } from '../_services/investment.service';
import { AlertifyService } from '../_services/alertify.service';
var InvestmentsComponent = /** @class */ (function () {
    function InvestmentsComponent(investmentService, route, alertify) {
        this.investmentService = investmentService;
        this.route = route;
        this.alertify = alertify;
        this.codeFilter = '';
        this.marketFilter = '';
        this.currencyFilter = '';
        this.orderBy = 'code';
        this.markets = [];
        this.currencies = [];
    }
    InvestmentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.investments = data['investments'].result;
            _this.pagination = data['investments'].pagination;
        });
        this.markets = this.investmentService.markets;
        this.currencies = this.investmentService.currencies;
    };
    InvestmentsComponent.prototype.getInvestmentParams = function () {
        var params = {
            investmentCode: this.codeFilter,
            market: this.marketFilter,
            currency: this.currencyFilter,
            orderBy: this.orderBy
        };
        return params;
    };
    InvestmentsComponent.prototype.onPageChanged = function (event) {
        this.pagination.currentPage = event.page;
        this.loadInvestments();
    };
    InvestmentsComponent.prototype.loadInvestments = function () {
        var _this = this;
        this.investmentService.getInvestments(this.pagination.currentPage, this.pagination.itemsPerPage, this.getInvestmentParams()).subscribe(function (res) {
            _this.investments = res.result;
            _this.pagination = res.pagination;
        }, function (error) {
            _this.alertify.error(error);
        });
    };
    InvestmentsComponent.prototype.onApplyfilters = function () {
        this.loadInvestments();
    };
    InvestmentsComponent.prototype.onResetFilter = function () {
        this.codeFilter = '';
        this.marketFilter = '';
        this.currencyFilter = '';
        this.loadInvestments();
    };
    InvestmentsComponent = __decorate([
        Component({
            selector: 'app-investments',
            templateUrl: './investments.component.html',
            styleUrls: ['./investments.component.css']
        }),
        __metadata("design:paramtypes", [InvestmentService,
            ActivatedRoute,
            AlertifyService])
    ], InvestmentsComponent);
    return InvestmentsComponent;
}());
export { InvestmentsComponent };
//# sourceMappingURL=investments.component.js.map