import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('http://localhost:8080/friend/all-users');
  }

  getFriendRequests() {
    return this.http.get('http://localhost:8080/friend/requests');
  }
}
