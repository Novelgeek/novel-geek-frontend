import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: String;
  constructor(private authService: AuthService, private toastr: ToastrService,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
  }

  recoverPassword() {
    this.authService.sendPasswordResetLink(this.email).subscribe(data => {
      this.toastr.success('An email will been sent to you with the necessary instructions, please check your email to reset the password');
      this.router.navigate(['/login'])
    }, error => {
      this.toastr.error(error);
    })
  }

}
