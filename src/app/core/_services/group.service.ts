import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  createGroup(newGroup: FormData) {
    return this.http.post('http://localhost:8080/group/new', newGroup);
  }

  updateGroup(name: String, description: String, photo: String, groupId) {
    return this.http.post<any>('http://localhost:8080/group/' + groupId + '/update',
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

  inviteUser(groupId: number, userId: number) {
    return this.http.post('http://localhost:8080/group/' + groupId + '/inviteUser/' + userId, {})
  }

  acceptInvite(inviteId) {
    return this.http.post<any>('http://localhost:8080/group/acceptInvite/' + inviteId , {});
  }

  declineInvite(inviteId) {
    return this.http.post<any>('http://localhost:8080/group/declineInvite/' + inviteId , {});
  }

  requestMembership(groupId) {
    return this.http.post('http://localhost:8080/group/' + groupId + '/requestMembership', {})
  }

  getRequests(groupId) {
    return this.http.get('http://localhost:8080/group/' + groupId + '/getRequests');
  }

  acceptRequest(requestId) {
    return this.http.get('http://localhost:8080/group/acceptRequest/' + requestId);
  }

  leaveGroup(groupId) {
    return this.http.get('http://localhost:8080/group/' + groupId + '/leaveGroup')
  }

  removeUser(groupId, userId) {
    return this.http.get('http://localhost:8080/group/' + groupId + '/removeUser/' + userId)
  }

  deleteGroup(groupId) {
    return this.http.delete('http://localhost:8080/group/' + groupId);
  }

  getMembersAndNonMenbers(groupId) {
    return this.http.get('http://localhost:8080/group/getAllUsers/' + groupId)
  }

}
