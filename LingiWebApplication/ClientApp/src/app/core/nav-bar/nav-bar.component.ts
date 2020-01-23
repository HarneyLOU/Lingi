import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    open: boolean = true;
    user: string;
    welcome: string;

    constructor() {
        this.user = localStorage.getItem("user").toString();
        this.welcome = "Logged as: " + this.user.replace("\"", "").replace("\"", "");
    }

  ngOnInit() {
    }

}
