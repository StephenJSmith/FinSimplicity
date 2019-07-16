import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { JwtModule } from '@auth0/angular-jwt';
import { BsDropdownModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { InvestmentsComponent} from './investments/investments.component';
import { InvestorsComponent} from './investors/investors.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { InvestmentsResolver } from './_resolvers/investments.resolver';
import { appRoutes } from './routes';

export function tokenGetter() {
    return localStorage.getItem('token');
}

// TODO: JwtModule config to be updated with prod white/blacklist
@NgModule({
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
export class AppModule { }
