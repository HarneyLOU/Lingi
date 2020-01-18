import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TestService } from '../test.service';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})

export class TestComponent {

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string, private testService: TestService) {

        let test;

        let type = this.router.getCurrentNavigation().extras.state.type;
        var id = +this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.testService.getTest(id).subscribe(result => {
                test = result;

                switch (type) {
                    case "Flashcards":
                        this.router.navigate(["flashcard"], { skipLocationChange: true });
                        console.log("YAAAY");
                        break;
                }

            }, error => console.error(error));

        }
        else {
            console.log("Wrong id - returning home address...");
            this.router.navigate(["home"]);
        }
    }
}
