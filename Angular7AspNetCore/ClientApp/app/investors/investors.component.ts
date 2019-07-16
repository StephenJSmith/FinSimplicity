import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
    selector: 'app-investors',
    templateUrl: './investors.component.html',
    styleUrls: ['./investors.component.css']
})
export class InvestorsComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
