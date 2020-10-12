import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  createGroup(newGroup: FormData) {
    return this.http.post('/group/new', newGroup);
  }

  updateGroup(name: String, description: String, photo: String, groupId) {
    return this.http.post<any>('/group/' + groupId + '/update',
      {
        groupName: name,
        description: description,
        groupAvatar: photo
      }
    );
  }

  getUserGroups() {
    return this.http.get('/group/getGroups');
  }

  getAllGroups() {
    return this.http.get('/group/all');
  }

  getGroupInvites() {
    return this.http.get('/group/invites');
  }

  getSingleGroup(groupId) {
    return this.http.get('/group/' + groupId);
  }

  inviteUser(groupId: number, userId: number) {
    return this.http.post('/group/' + groupId + '/inviteUser/' + userId, {})
  }

  acceptInvite(inviteId) {
    return this.http.post<any>('/group/acceptInvite/' + inviteId , {});
  }

  declineInvite(inviteId) {
    return this.http.post<any>('/group/declineInvite/' + inviteId , {});
  }

  requestMembership(groupId) {
    return this.http.post('/group/' + groupId + '/requestMembership', {})
  }

  getRequests(groupId) {
    return this.http.get('/group/' + groupId + '/getRequests');
  }

  acceptRequest(requestId) {
    return this.http.get('/group/acceptRequest/' + requestId);
  }

  leaveGroup(groupId) {
    return this.http.get('/group/' + groupId + '/leaveGroup')
  }

  removeUser(groupId, userId) {
    return this.http.get('/group/' + groupId + '/removeUser/' + userId)
  }

  deleteGroup(groupId) {
    return this.http.delete('/group/' + groupId);
  }

  getMembersAndNonMenbers(groupId) {
    return this.http.get('/group/getAllUsers/' + groupId)
  }

  createPost(newpost: FormData, groupId) {
    return this.http.post('/group/' + groupId + '/newpost', newpost)
}

}
