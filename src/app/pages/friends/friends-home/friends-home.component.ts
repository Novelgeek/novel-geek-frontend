import { Component, OnInit } from '@angular/core';
import { FriendService } from 'app/core/_services/friend.service';

@Component({
  selector: 'app-friends-home',
  templateUrl: './friends-home.component.html',
  styleUrls: ['./friends-home.component.scss']
})
export class FriendsHomeComponent implements OnInit {
  allUsers: any = [];
  friends: any = [];
  notFriends: any = [];
  requests: any = [];

  constructor(private friendService: FriendService) { }

  search(){
    console.log("searching");
  }
  ngOnInit() {
    this.friendService.getUsers().subscribe(data => {
      this.allUsers = data;
      this.friends = this.allUsers.filter( user => {
        return user.friend;
      })
      this.notFriends = this.allUsers.filter( user => {
        return !user.friend;
      })
      console.log(this.allUsers);
    })

    this.friendService.getFriendRequests().subscribe(data => {
      this.requests = data;
    })
  }

  acceptFriendRequest(id) {
    this.friendService.acceptFriendRequest(id).subscribe(data => {
      console.log('friend req acceoted')
    })
  }

  declineFriendRequest(id) {
    this.friendService.declineFriendRequest(id).subscribe(data => {
      console.log('friend req declined')
    })
  }

}
