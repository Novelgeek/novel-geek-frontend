import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  currentUser: User;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router, private jwtService: JwtHelperService) { }

  signup(username: string, email: string, password: string) {

    return this.http.post('/auth/signup',
      {
        username: username,
        email: email,
        password: password,
      }
    );
  }

  private handleAuthentication(token: string, username: string) {
    const expirationDate = this.jwtService.getTokenExpirationDate(token);
    // expiresIn is in miliseconds to start the timer
    const expiresIn = expirationDate.getTime() - new Date().getTime();
    const decodedToken = this.jwtService.decodeToken(token);
    const user = new User(username, decodedToken.id , token, expirationDate,
      decodedToken.username, decodedToken.image || null, decodedToken.role);
    this.user.next(user);
    this.currentUser = user;
    this.autoLogout(expiresIn);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

  }

  login(email: string, password: string) {

    return this.http.post<{token: string, username: string}>('/auth/login',
      {
        email: email,
        password: password,
      }
    ).pipe( tap(response => {
        this.handleAuthentication(response.token, response.username);
    }));

  }

  logout() {
    this.user.next(null);
    this.currentUser = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) { return; }

    // tslint:disable-next-line: max-line-length
    const loadedUser = new User(user.email, user.id, user._token, new Date(user.tokenExpirationDate), user.username, user.photoUrl, user.role);

    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.currentUser = loadedUser;
      const expirationDuration = new Date( loadedUser.tokenExpirationDate.getTime() - new Date().getTime())
      this.autoLogout(+expirationDuration);
      console.log(loadedUser.role);
      // this.router.navigate(['/posts'])
    }
  }

  isLoggedIn(){
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) { return false; }
    return true;
  }

  autoLogout(expirationDuration: number) {

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  oAuthToken(token: string) {
    this.handleAuthentication(token, this.jwtService.decodeToken(token).sub);
    this.autoLogin();
    this.router.navigate(['/posts'])
  }

  adminLogin(email, password) {
    return this.http.post<{token: string, username: string}>('/admin/auth/login',
      {
        email: email,
        password: password,
      }
    ).pipe( tap(response => {
        this.handleAuthentication(response.token, response.username);
    }));
  }

  sendPasswordResetLink(email) {
    return this.http.post('/auth/forgot-password', { email: email });
  }

  resetPassword(password, token) {
    return this.http.post('/auth/reset-password', { password: password, token: token });
  }

  changePassword(password, oldPassword) {
    return this.http.post('/change-password', { password: password, oldPassword: oldPassword });
  }

  userUpdated(username) {
    const newUser = this.currentUser;
    const user = JSON.parse(localStorage.getItem('user'));
    user.username = username;
    localStorage.setItem('user', JSON.stringify(user));
    newUser.username = username;
    this.user.next(newUser)
  }

  imageUpdated(url) {
    const newUser = this.currentUser;
    const user = JSON.parse(localStorage.getItem('user'));
    user.photoUrl = url;
    localStorage.setItem('user', JSON.stringify(user));
    newUser.photoUrl = url;
    this.user.next(newUser)
  }

}
