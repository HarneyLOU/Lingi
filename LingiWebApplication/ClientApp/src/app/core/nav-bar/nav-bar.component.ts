import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    open: boolean = false;
    user: string;

    constructor() {
        this.user = localStorage.getItem("user");
        console.log(this.user);
    }

  ngOnInit() {
    }

}
