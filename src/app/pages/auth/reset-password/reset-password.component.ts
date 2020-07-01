import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetToken: string;
  confirmPassword: string;
  passwordForm: FormGroup;
  constructor(private route: ActivatedRoute, private authService: AuthService,
              private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required),
    }, this.passwordMatchValidator);


    this.route.queryParams.subscribe(params => {
      this.resetToken = params.token;
    })
  }

  
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  get f() { return this.passwordForm.controls; }

  onSubmit() {

    const password = this.passwordForm.value.password;

    this.authService.resetPassword(password, this.resetToken).subscribe(data => {
      this.toastr.success('Your password has been changed successfully')
      this.router.navigate(['login'])
    }, error => {
      this.toastr.error(error);
    })
  }
}
