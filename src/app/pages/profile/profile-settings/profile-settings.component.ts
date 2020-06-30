import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'app/core/_services/user.service';
import { Userdetails } from 'app/core/_models/userdetails.model';
import { User } from 'app/core/_models/user.model';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})

export class ProfileSettingsComponent implements OnInit {
  userSettingForm: FormGroup;
  userDetails: Userdetails;
  constructor(private userService: UserService) {}

  ngOnInit() {

    this.userSettingForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'contact': new FormControl(null),
      'city': new FormControl(null),
      'country': new FormControl(null),
      'description': new FormControl(null)
  });

    this.userService.getUserDetais().subscribe(data => {
      this.userDetails = data;
      console.log(data.username);
      this.userSettingForm.setValue({
        'username':data.username,
        'contact': data.contact,
        'city': data.city,
        'country':data.country,
        'description': data.description
      
    });
      
    }, error => {
      console.log(error);
      
    })

    // this.userSettingForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.userSettingForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

  }

  onSubmit() {
    console.log(this.userSettingForm);
    const user = new Userdetails(this.userSettingForm.value.username,
      this.userSettingForm.value.contact,
      this.userSettingForm.value.city,
      this.userSettingForm.value.country,
      this.userSettingForm.value.description);
    this.userService.saveUserDetails(user).subscribe(data => {
    })
    // this.userSettingForm.reset();
  }
  
  }


