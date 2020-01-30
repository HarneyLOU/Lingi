import { Component } from '@angular/core';
import {UserService} from './user.service'

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent {

    user: User;

    constructor(private userService: UserService) {
        this.userService.getUser().subscribe(result => {
            this.user = result;
        }        
        )
    }
}
