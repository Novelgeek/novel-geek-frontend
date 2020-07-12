import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FriendService } from 'app/core/_services/friend.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent implements OnInit {
  @Input() user: any;
  @Output() unFriend = new EventEmitter();


  constructor(private friendService: FriendService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  unFriendUser() {
    this.spinner.show()
    this.friendService.unFriend(this.user.id).subscribe(data => {
      this.user.friend = false;
      this.toastr.info('Unfriended ' + this.user.username);
      this.unFriend.emit({status: true, id: this.user.id});
      this.spinner.hide()
    }, errorMsg => {
      this.toastr.error('Unable to unfriend ' + this.user.username + ', Please try again later.')
      this.spinner.hide()
    })
  }

  cancelSentRequest() {
    this.spinner.show()
    this.friendService.cancelSentRequest(this.user.id).subscribe(data => {
      this.user.status = null;
      this.toastr.info('Friend request to  ' + this.user.username + ' has been cancelled');
      this.spinner.hide()
    }, errorMsg => {
      this.toastr.error('Unable to cancel the friend request sent to ' + this.user.username)
      this.spinner.hide()
    })
  }

  sendFriendRequest() {
    this.spinner.show()
    this.friendService.sendFriendRequest(this.user.id).subscribe(data => {
      this.user.status = 'REQUESTED';
      this.toastr.success('Friend request sent to  ' + this.user.username);
      this.spinner.hide()
    }, errorMsg => {
      this.toastr.error('Unable to send friend request to ' + this.user.username)
      this.spinner.hide()
    })
  }

}
