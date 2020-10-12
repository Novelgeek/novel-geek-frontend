import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'app/core/_services/user.service';
import { Userdetails } from 'app/core/_models/userdetails.model';
import { User } from 'app/core/_models/user.model';
import { AuthService } from 'app/core/_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
})
export class ProfileSettingsComponent implements OnInit {
  userSettingForm: FormGroup;
  passwordResetForm: FormGroup;

  userDetails: Userdetails;
  constructor(private userService: UserService, private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    this.userSettingForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      contact: new FormControl(null),
      city: new FormControl(null),
      country: new FormControl(null),
      description: new FormControl(null),
    });

    this.passwordResetForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required),
    }, this.passwordMatchValidator);

    this.userService.getUserDetais().subscribe(
      (data) => {
        this.userDetails = data;
        console.log(data.username);
        this.userSettingForm.setValue({
          username: data.username,
          contact: data.contact,
          city: data.city,
          country: data.country,
          description: data.description,
        });
      },
      (error) => {
        console.log(error);
      }
    );

    // this.userSettingForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    // this.userSettingForm.statusChanges.subscribe((status) =>
    //   console.log(status)
    // );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  get f() { return this.passwordResetForm.controls; }

  onSubmit() {
    console.log(this.userSettingForm);
    const user = new Userdetails(
      this.userSettingForm.value.username,
      this.userSettingForm.value.contact,
      this.userSettingForm.value.city,
      this.userSettingForm.value.country,
      this.userSettingForm.value.description
    );
    this.userService.saveUserDetails(user).subscribe((data) => {
      this.toastr.success('User updated succesfully');
      this.authService.userUpdated(user.username);
    });
    // this.userSettingForm.reset();
  }

  onPasswordChange() {
    this.authService.changePassword(this.passwordResetForm.value.password, this.passwordResetForm.value.oldPassword).subscribe(data => {
      this.toastr.success('Password change Successful')
    }, error => {
      this.toastr.error(error.error);
    });

  }
}
