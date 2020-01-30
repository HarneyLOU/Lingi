import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
/** home component*/
export class HomeComponent {
    /** home ctor */
    constructor(private authService: AuthService,
        private router: Router
    ) {
        if (!this.authService.isLoggedIn()) router.navigate(["register"]);
    }
}
