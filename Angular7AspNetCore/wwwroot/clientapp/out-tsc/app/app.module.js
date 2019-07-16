var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { BsDropdownModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { InvestmentsComponent } from './investments/investments.component';
import { InvestorsComponent } from './investors/investors.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { InvestmentsResolver } from './_resolvers/investments.resolver';
import { appRoutes } from './routes';
export function tokenGetter() {
    return localStorage.getItem('token');
}
// TODO: JwtModule config to be updated with prod white/blacklist
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                NavComponent,
                HomeComponent,
                InvestmentsComponent,
                InvestorsComponent
            ],
            imports: [
                BrowserModule,
                HttpClientModule,
                FormsModule,
                BsDropdownModule.forRoot(),
                PaginationModule.forRoot(),
                ButtonsModule.forRoot(),
                RouterModule.forRoot(appRoutes),
                JwtModule.forRoot({
                    config: {
                        tokenGetter: tokenGetter,
                        whitelistedDomains: ['localhost:8841'],
                        blacklistedRoutes: ['localhost:8841/api/auth']
                    }
                })
            ],
            providers: [
                ErrorInterceptorProvider,
                InvestmentsResolver
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map