import { Component, OnInit } from '@angular/core';
import { FriendService } from 'app/core/_services/friend.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
  recommendations: any = [];

  constructor(private friendService: FriendService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

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
    })

    this.friendService.getFriendRequests().subscribe(data => {
      this.requests = data;
    })

    this.friendService.getFriendRecommendations().subscribe(data => {
      this.recommendations = data;
      console.log(data)
    })

  }

  acceptFriendRequest(id) {
    this.spinner.show()
    this.friendService.acceptFriendRequest(id).subscribe(data => {
      this.toastr.info('Friend request Accepted');
      this.allUsers.push(data);
      this.requests = this.requests.filter( request => {
        return request.id !== id
      })
      this.friends = this.allUsers.filter( user => {
        return user.friend;
      })
      this.notFriends = this.allUsers.filter( user => {
        return !user.friend;
      })
      this.recommendations = this.recommendations.filter( user => {
        return user.id !== id
      })
      this.spinner.hide()
    }, errorMsg => {
      this.toastr.error('Unable to Accept request currently, please try again later!')
      this.spinner.hide()
    })
  }

  declineFriendRequest(id) {
    this.spinner.show()
    this.friendService.declineFriendRequest(id).subscribe(data => {
      this.toastr.info('Friend request declined');
      this.requests = this.requests.filter( request => {
        return request.id !== id
      })
      this.spinner.hide()
    }, errorMsg => {
      this.toastr.error('Unable to decline request currently, please try again later!')
      this.spinner.hide()
    })
  }

  unFriended($event) {
    if ($event.status === true) {
      console.log($event.id);
      this.allUsers.forEach(user => {
        if (user.id === $event.id) {
          user.friend = false;
        }
      });
      this.friends = this.allUsers.filter( user => {
        return user.friend;
      })
      this.notFriends = this.allUsers.filter( user => {
        return !user.friend;
      })
    }
  }
}
