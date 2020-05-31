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

  updateGroup(name: String, description: String, photo: String, groupId) {
    return this.http.post('http://localhost:8080/group/' + groupId + '/update',
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

  requestMembership(groupId) {
    return this.http.post('http://localhost:8080/group/' + groupId + '/requestMembership', {})
  }

  // no need
  getRequests(groupId) {
    return this.http.get('http://localhost:8080/group/' + groupId + '/getRequests');
  }

  acceptRequest(groupId, userId) {
    return this.http.get('http://localhost:8080/group/' + groupId + '/acceptRequest/' + userId);
  }

  leaveGroup(groupId) {
    return this.http.get('http://localhost:8080/group/' + groupId + '/leaveGroup')
  }

  removeUser(groupId, userId) {
    return this.http.get('http://localhost:8080/group/' + groupId + '/removeUser/' + userId)
  }

  getRole(groupId) {
    return this.http.get('http://localhost:8080/group/' + groupId + '/getRole');
  }

}
