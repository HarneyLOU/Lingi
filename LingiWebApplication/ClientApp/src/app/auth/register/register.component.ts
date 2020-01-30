import { Component, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {
    title: string;
    form: FormGroup;

    constructor(private router: Router,
        private fb: FormBuilder,
        private authService: AuthService,
        @Inject('BASE_URL') private baseUrl: string) {

        if (this.authService.isLoggedIn()) router.navigate(["home"]);

        this.title = "User Login";
        this.createForm();

    }

    createForm() {
        this.form = this.fb.group({
            Username: ['', Validators.required],
            Password: ['', Validators.required]
        });
    }

    onSubmit() {
        var url = this.baseUrl + "api/token/auth";
        var username = this.form.value.Username;
        var password = this.form.value.Password;

        this.authService.login(username, password)
            .subscribe(res => {
                // login successful

                // outputs the login info through a JS alert.
                // IMPORTANT: remove this when test is done.
                alert("Login successful! "
                    + "USERNAME: "
                    + username
                    + " TOKEN: "
                    + this.authService.getAuth()!.token
                );

                this.router.navigate(["home"]);
            },
                err => {
                    // login failed
                    this.form.setErrors({
                        "auth": "Incorrect username or password"
                    });
                });
    }

    onBack() {
        this.router.navigate(["home"]);
    }

    // retrieve a FormControl
    getFormControl(name: string) {
        return this.form.get(name);
    }

    // returns TRUE if the FormControl is valid
    isValid(name: string) {
        var e = this.getFormControl(name);
        return e && e.valid;
    }

    // returns TRUE if the FormControl has been changed
    isChanged(name: string) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched);
    }

    // returns TRUE if the FormControl is invalid after user changes
    hasError(name: string): boolean {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched) && e.invalid;
    }
}
