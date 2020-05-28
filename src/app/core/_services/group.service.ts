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

}
