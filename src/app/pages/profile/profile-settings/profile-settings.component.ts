import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})

export class ProfileSettingsComponent implements OnInit {
  userSettingForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.userSettingForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'contact': new FormControl(null),
        'city': new FormControl(null),
        'country': new FormControl(null),
        'description': new FormControl(null)
      })
    });
    // this.userSettingForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.userSettingForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

    this.userSettingForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'max@test.com'
      }
    });

    this.userSettingForm.patchValue({
      'userData': {
        'username': 'Anna',
      }
    });
  }

  onSubmit() {
    console.log(this.userSettingForm);
    this.userSettingForm.reset();
  }
  
  }


