import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-browse-tests',
    templateUrl: './browse-tests.component.html',
    styleUrls: ['./browse-tests.component.css']
})

export class BrowseTestsComponent {

    user: string;

    constructor(private activatedRoute: ActivatedRoute) {
        this.user = this.activatedRoute.snapshot.params["user"];
    }

    ngOninit() {

    }
}
