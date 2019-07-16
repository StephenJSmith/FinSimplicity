import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Investment } from '../_models/investment';
import { InvestmentParams } from '../_models/investmentParams';
import { PaginatedResult } from '../_models/pagination';


@Injectable({
    providedIn: 'root'
})
export class InvestmentService {
    baseUrl = environment.apiUrl + 'investments';

    markets = ['ASX', 'NYSE', 'LSE'];
    currencies = ['AUD', 'USD', 'GBP'];

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }


    getInvestments(page?, itemsPerPage?, investmentParams?: InvestmentParams)
            : Observable<PaginatedResult<Investment[]>> {
        const url = this.baseUrl;
        const paginatedResult: PaginatedResult<Investment[]>
            = new PaginatedResult<Investment[]>();
        let params = new HttpParams();
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

        return this.http.get<Investment[]>(url, { observe: 'response', params })
            .pipe(
            map(response => {
                paginatedResult.result = response.body;
                if (response.headers.get('Pagination') != null) {
                    const parsedPagination = JSON.parse(response.headers.get('Pagination'));
                    paginatedResult.pagination = parsedPagination;
                }

                return paginatedResult;

            })
            );

    }

    getInvestment(id: number): Observable<Investment> {
        const url = `${this.baseUrl}/${id}`;

        return this.http.get<Investment>(url);
    }
}
