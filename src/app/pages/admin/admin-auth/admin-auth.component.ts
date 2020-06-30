import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/_services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { error } from 'protractor';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss']
})
export class AdminAuthComponent implements OnInit {
  email: string;
  password: string;
  constructor(private authService: AuthService, private router: Router,
              private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.email = form.value.email;
    this.password = form.value.password;
    this.spinner.show();
    this.authService.adminLogin(this.email, this.password).subscribe(data => {
      console.log(data);
      this.router.navigate(['admin/home'])
      this.spinner.hide();
    }, errorMsg => {
      this.spinner.hide();
      this.toastr.error(errorMsg.error);
    })
  }
}
