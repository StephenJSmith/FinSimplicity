import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvestmentService } from '../_services/investment.service';
import { AlertifyService } from '../_services/alertify.service';
import { Investment } from '../_models/investment';
import { InvestmentParams } from '../_models/investmentParams';
import { Pagination, PaginatedResult } from '../_models/pagination';

@Component({
    selector: 'app-investments',
    templateUrl: './investments.component.html',
    styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
    investments: Investment[];
    pagination: Pagination;
    codeFilter: string = '';
    marketFilter: string = '';
    currencyFilter: string = '';
    orderBy = 'code';
    markets = [];
    currencies = [];

    constructor(
        private investmentService: InvestmentService,
        private route: ActivatedRoute,
        private alertify: AlertifyService
    ) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.investments = data['investments'].result;
            this.pagination = data['investments'].pagination;
        });

        this.markets = this.investmentService.markets;
        this.currencies = this.investmentService.currencies;
    }

    private getInvestmentParams() {
        const params: InvestmentParams = {
            investmentCode: this.codeFilter,
            market: this.marketFilter,
            currency: this.currencyFilter,
            orderBy: this.orderBy
        };


        return params;
    }

    onPageChanged(event: any) {
        this.pagination.currentPage = event.page;
        this.loadInvestments();
    }

    loadInvestments() {
        this.investmentService.getInvestments(
            this.pagination.currentPage,
            this.pagination.itemsPerPage,
            this.getInvestmentParams()
        ).subscribe((res: PaginatedResult<Investment[]>) => {
            this.investments = res.result;
            this.pagination = res.pagination;
            }, error => {
            this.alertify.error(error);
        });
    }

    onApplyfilters() {
        this.loadInvestments();
    }

    onResetFilter() {
        this.codeFilter = '';
        this.marketFilter = '';
        this.currencyFilter = '';

        this.loadInvestments();
    }
}
