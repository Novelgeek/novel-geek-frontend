import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'app/core/_services/admin.service';
import { AuthService } from 'app/core/_services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
})
export class AdminProfileComponent implements OnInit {
  userSettingForm: FormGroup;
  passwordResetForm: FormGroup;
  user: any;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.user = this.authService.currentUser;
    this.userSettingForm = new FormGroup({
      username: new FormControl(this.user.username, [Validators.required]),
    });

    this.passwordResetForm = new FormGroup(
      {
        oldPassword: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      this.passwordMatchValidator
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    this.spinner.show()
    this.adminService
      .updateAdmin(this.userSettingForm.value.username)
      .subscribe(
        (data) => {
          this.toastr.success('User updated succesfully');
          this.authService.adminUpdated(this.userSettingForm.value.username);
          this.spinner.hide()
        },
        (error) => {
          this.toastr.error('Unable to update at the moment');
          this.spinner.hide()
        }
      );
    // this.userSettingForm.reset();
  }

  onPasswordChange() {
    this.spinner.show()
    this.adminService
      .changePassword(
        this.passwordResetForm.value.password,
        this.passwordResetForm.value.oldPassword
      )
      .subscribe(
        (data) => {
          this.toastr.success('Password change Successful');
          this.spinner.hide()
        },
        (error) => {
          this.toastr.error(error.error);
          this.spinner.hide()
        }
      );
  }
}
