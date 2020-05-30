import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  createGroup(name: String, description: String, photo: String) {
    return this.http.post('http://localhost:8080/group/new',
      {
        groupName: name,
        description: description,
        groupAvatar: photo
      }
    );
  }

  getUserGroups() {
    return this.http.get('http://localhost:8080/group/getGroups');
  }

  getAllGroups() {
    return this.http.get('http://localhost:8080/group/all');
  }

  getGroupInvites() {
    return this.http.get('http://localhost:8080/group/invites');
  }

  getSingleGroup(groupId) {
    return this.http.get('http://localhost:8080/group/' + groupId);
  }

  inviteUser(groupId, userId) {
    return this.http.post('http://localhost:8080/group/' + groupId + '/inviteUser/' + userId, {})
  }

  acceptInvite(groupId) {
    return this.http.post('http://localhost:8080/group/' + groupId + '/acceptInvite' , {});
  }

}
