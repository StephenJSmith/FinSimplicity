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
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InvestmentService } from '../_services/investment.service';
import { AlertifyService } from '../_services/alertify.service';
var InvestmentsResolver = /** @class */ (function () {
    function InvestmentsResolver(investmentService, router, alertify) {
        this.investmentService = investmentService;
        this.router = router;
        this.alertify = alertify;
        this.pageNumber = 1;
        this.pageSize = 10;
    }
    InvestmentsResolver.prototype.resolve = function () {
        var _this = this;
        return this.investmentService.getInvestments(this.pageNumber, this.pageSize)
            .pipe(catchError(function () {
            _this.alertify.error('Problem retrieving data');
            _this.router.navigate(['/home']);
            return of(null);
        }));
    };
    InvestmentsResolver = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [InvestmentService,
            Router,
            AlertifyService])
    ], InvestmentsResolver);
    return InvestmentsResolver;
}());
export { InvestmentsResolver };
//# sourceMappingURL=investments.resolver.js.map