import { Injectable } from '@angular/core';
import { FriendService } from './friend.service';
import { GroupService } from './group.service';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  groupNotifications = new BehaviorSubject<any>([]);
  friendNotifications = new BehaviorSubject<any>([]);
  

  constructor(
    private friendService: FriendService,
    private groupService: GroupService,
    private authService: AuthService
  ) {}

  getAllNotifications() {
    this.groupService.getGroupInvites().subscribe(data => {
      this.groupNotifications.next(data);
    })

    this.friendService.getFriendRequests().subscribe(data => {
      this.friendNotifications.next(data)
    })



  }
}
