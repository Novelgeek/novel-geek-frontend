import { Component, OnInit, Input } from '@angular/core';
import { FriendService } from 'app/core/_services/friend.service';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent implements OnInit {
  @Input() user: any;

  constructor(private friendService: FriendService) { }

  ngOnInit() {
  }

  unFriend() {
    this.friendService.unFriend(this.user.id).subscribe(data => {
      console.log('unfriended')
    })
  }

  cancelSentRequest() {
    this.friendService.cancelSentRequest(this.user.id).subscribe(data => {
      console.log('friend req cancelled')
    })
  }

  sendFriendRequest() {
    this.friendService.sendFriendRequest(this.user.id).subscribe(data => {
      console.log('friend req sent')
    })
  }

}
