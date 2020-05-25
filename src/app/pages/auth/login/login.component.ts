import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/core/_services/auth.service';
import { error } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  submitted = false;
  constructor(private authService: AuthService, private router: Router,
              private route: ActivatedRoute, private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.registered === 'true'){
        this.toastr.success('Account registered Successfully, Login to Continue');
      }
      if(params.auth_token != null) {
        this.authService.oAuthToken(params.auth_token);
      }
      if(params.error != null) {
        this.toastr.error(params.error);
      }
    })
  }

  onSubmit(form: NgForm) {
    this.email = form.value.email;
    this.password = form.value.password;

    console.log(this.email);
    console.log(this.password);
    this.submitted = true;
    this.spinner.show();
    this.authService.login(this.email, this.password).subscribe( response => {
      console.log(response);
      this.router.navigate(['/posts'])
      this.spinner.hide();
    }, errorMsg => {
      this.spinner.hide();
      this.toastr.error(errorMsg.error);
      console.log(errorMsg);
    });

  }

}
