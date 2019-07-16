import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

const TokenName = 'token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    baseUrl = environment.apiUrl + 'auth/';
    jwtHelper = new JwtHelperService();
    decodedToken: any;

    get tokenId(): string {
        if (!this.decodedToken) { return null; }

        return this.decodedToken.nameid;
    }

    get tokenUsername(): string {
        if (!this.decodedToken) { return null; }

        return this.decodedToken.unique_name;
    }
    
    constructor(
        private http: HttpClient
    ) { }

    login(model: any) {
        const url = `${this.baseUrl}login`;

        return this.http.post(url, model)
            .pipe(
            map((response: any) => {
                const user = response;
                if (user) {
                    localStorage.setItem(TokenName, user.token);
                    this.decodedToken = this.jwtHelper.decodeToken(user.token);
                }
            })
       );
    }

    logout() {
        localStorage.removeItem(TokenName);
    }

    isLoggedIn(): boolean {
        const token = this.getToken();
        if (!token) { return false; }

        const isLoggedIn = !this.jwtHelper.isTokenExpired(token);

        return isLoggedIn;
    }

    getToken() {
        return localStorage.getItem(TokenName);
    }

    recheckToken() {
        const token = this.getToken();
        if (!token) { return; }

        this.decodedToken = this.jwtHelper.decodeToken(token);
    }
}