import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    model: any = {};
    isLoggedin = false;
    loggedInUsername: string;

    constructor(
        private authService: AuthService,
        private alertify: AlertifyService,
        private router: Router
    ) { }

    ngOnInit() {
        this.setLoggedInDetails();
    }

    login() {
        this.authService.login(this.model)
            .subscribe(next => {
                this.setLoggedInDetails();
                this.alertify.success('Logged in successfully');
            }, error => {
                this.alertify.error(error);
            }, () => {
                this.router.navigate(['/investments']);
            });
    }

    logout() {
        this.authService.logout();
        this.setLoggedInDetails();
        this.alertify.message('Logged out');
        this.router.navigate(['/home']);
    }

    private setLoggedInDetails() {
        this.isLoggedin = this.authService.isLoggedIn();
        this.loggedInUsername = this.authService.tokenUsername;
    }
}