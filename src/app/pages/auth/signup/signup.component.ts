import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'app/core/_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router,
              private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required),
    }, this.passwordMatchValidator);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  get f() { return this.registerForm.controls; }

  onSubmit(form: NgForm) {
    if (!this.registerForm.valid) {
      return;
    }
    this.spinner.show()
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const username = this.registerForm.value.username;
    this.authService.signup(username, email, password).subscribe( response => {
      console.log(response);
      this.spinner.hide();
      this.router.navigate(['login'], {queryParams: { registered: 'true' } });
    }, error => {
      this.spinner.hide();
      this.toastr.error(error.error.error);
      console.log(error)
    })
    this.registerForm.reset();
  }
}
