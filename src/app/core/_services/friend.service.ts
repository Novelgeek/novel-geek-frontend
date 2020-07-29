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

  getFriendRecommendations() {
    return this.http.get('http://localhost:8080/friend/recommended-users');
  }

  acceptFriendRequest(userId) {
    return this.http.post('http://localhost:8080/friend/accept-request/' + userId, {});
  }

  declineFriendRequest(userId) {
    return this.http.post('http://localhost:8080/friend/decline-request/' + userId, {});
  }

  cancelSentRequest(userId) {
    return this.http.post('http://localhost:8080/friend/cancel-friend-request/' + userId, {});
  }

  unFriend(userId) {
    return this.http.post('http://localhost:8080/friend/unfriend/' + userId, {});
  }

  sendFriendRequest(userId) {
    return this.http.post('http://localhost:8080/friend/send-request/' + userId, {});
  }
}
