﻿import { Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { InvestmentsComponent } from './investments/investments.component';
import { InvestorsComponent } from './investors/investors.component';
import { InvestmentsResolver } from "./_resolvers/investments.resolver";

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'investments',
                component: InvestmentsComponent,
                resolve: {investments: InvestmentsResolver}
            },
            { path: 'investors', component: InvestorsComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];