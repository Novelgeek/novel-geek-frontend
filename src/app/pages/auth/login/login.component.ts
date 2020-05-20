import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/core/_services/auth.service';
import { error } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  submitted = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.email = form.value.email;
    this.password = form.value.password;

    console.log(this.email);
    console.log(this.password);
    this.submitted = true;

    this.authService.login(this.email, this.password).subscribe( response => {
      console.log(response)
      this.router.navigate(['/posts'])
    }, errorMsg => {
      console.log(errorMsg);
    });

  }

}
