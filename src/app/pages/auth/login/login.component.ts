import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  submitted = false;
  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.email = form.value.email;
    this.password = form.value.password;

    console.log(this.email);
    console.log(this.password);
    this.submitted = true;
  }

}
