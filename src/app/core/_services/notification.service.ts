import { Injectable } from '@angular/core';
import { FriendService } from './friend.service';
import { GroupService } from './group.service';
import {PostsService} from './posts.service';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  groupNotifications = new BehaviorSubject<any>([]);
  friendNotifications = new BehaviorSubject<any>([]);
  reportNotifications = new BehaviorSubject<any>([]);
  commentNotifications = new BehaviorSubject<any>([]);
  replyNotifications = new BehaviorSubject<any>([]);

  constructor(
    private friendService: FriendService,
    private groupService: GroupService,
    private postService:PostsService,
    private authService: AuthService
  ) {}

  getAllNotifications() {
    this.groupService.getGroupInvites().subscribe(data => {
      this.groupNotifications.next(data);
    })

    this.friendService.getFriendRequests().subscribe(data => {
      this.friendNotifications.next(data);
    })

    this.postService.getReportNotifications().subscribe(data =>{
      this.reportNotifications.next(data);
    })

    this.postService.getCommentNotifications().subscribe(data =>{
      this.commentNotifications.next(data);
    })

    this.postService.getReplyNotifications().subscribe(data =>{
      this.replyNotifications.next(data);
    })
  }
}
