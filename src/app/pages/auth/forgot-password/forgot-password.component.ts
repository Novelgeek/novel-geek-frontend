import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/_services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: String;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  recoverPassword() {
    this.authService.sendPasswordResetLink(this.email).subscribe(data => {
      console.log(data);
    })
  }

}
