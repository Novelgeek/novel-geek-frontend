import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('/friend/all-users');
  }

  getFriendRequests() {
    return this.http.get('/friend/requests');
  }

  getFriendRecommendations() {
    return this.http.get('/friend/recommended-users');
  }

  acceptFriendRequest(userId) {
    return this.http.post('/friend/accept-request/' + userId, {});
  }

  declineFriendRequest(userId) {
    return this.http.post('/friend/decline-request/' + userId, {});
  }

  cancelSentRequest(userId) {
    return this.http.post('/friend/cancel-friend-request/' + userId, {});
  }

  unFriend(userId) {
    return this.http.post('/friend/unfriend/' + userId, {});
  }

  sendFriendRequest(userId) {
    return this.http.post('/friend/send-request/' + userId, {});
  }
}
