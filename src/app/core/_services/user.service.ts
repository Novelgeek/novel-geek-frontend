
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Userdetails } from '../_models/userdetails.model';
import { PhoneValidator } from 'ng2-validation/dist/phone/directive';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient, private router: Router, private jwtService: JwtHelperService) { }

  getUserDetais() {
    return this.http.get<Userdetails>('/user/me');
  }

  getUser(userId: number) {
    return this.http.get<any>('/user/' + userId);
  }

  saveUserDetails(userDetails: Userdetails) {
    return this.http.post('/user/save', userDetails);
  }

  getAllUsers() {
    return this.http.get('/user');
  }

  getAllUsersExceptMe() {
    return this.http.get('/user/all');
  }

  uploadImage(newimage: FormData, userId) {
    return this.http.post<any>('/user/' + userId + '/updateImage', newimage);
  }

  deleteUser(password) {
    return this.http.delete('/user/delete', password);
  }

}

