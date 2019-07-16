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
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { PaginatedResult } from '../_models/pagination';
var InvestmentService = /** @class */ (function () {
    function InvestmentService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.baseUrl = environment.apiUrl + 'investments';
        this.markets = ['ASX', 'NYSE', 'LSE'];
        this.currencies = ['AUD', 'USD', 'GBP'];
    }
    InvestmentService.prototype.getInvestments = function (page, itemsPerPage, investmentParams) {
        var url = this.baseUrl;
        var paginatedResult = new PaginatedResult();
        var params = new HttpParams();
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }
        if (investmentParams != null) {
            if (investmentParams.investmentCode) {
                params = params.append('investmentCode', investmentParams.investmentCode);
            }
            if (investmentParams.market) {
                params = params.append('market', investmentParams.market);
            }
            if (investmentParams.currency) {
                params = params.append('currency', investmentParams.currency);
            }
            params = params.append('orderBy', investmentParams.orderBy);
        }
        return this.http.get(url, { observe: 'response', params: params })
            .pipe(map(function (response) {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null) {
                var parsedPagination = JSON.parse(response.headers.get('Pagination'));
                paginatedResult.pagination = parsedPagination;
            }
            return paginatedResult;
        }));
    };
    InvestmentService.prototype.getInvestment = function (id) {
        var url = this.baseUrl + "/" + id;
        return this.http.get(url);
    };
    InvestmentService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            AuthService])
    ], InvestmentService);
    return InvestmentService;
}());
export { InvestmentService };
//# sourceMappingURL=investment.service.js.map