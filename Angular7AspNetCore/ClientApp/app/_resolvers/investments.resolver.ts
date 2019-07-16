import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InvestmentService } from '../_services/investment.service';
import { AlertifyService } from '../_services/alertify.service';
import { Investment } from '../_models/investment';

@Injectable()
export class InvestmentsResolver implements Resolve<Investment[]> {
    pageNumber = 1;
    pageSize = 10;

    constructor(
        private investmentService: InvestmentService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(): Observable<Investment[]> {
        return this.investmentService.getInvestments(
                this.pageNumber, this.pageSize)
            .pipe(
                catchError(() => {
                    this.alertify.error('Problem retrieving data');
                    this.router.navigate(['/home']);

                    return of(null);
                })
            );

    }
}