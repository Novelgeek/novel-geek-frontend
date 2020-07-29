import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Chat } from '../../../../../examples/chat/chat.model';
import { UserService } from 'app/core/_services/user.service';

@Component({
  selector: 'app-message-home',
  templateUrl: './message-home.component.html',
  styleUrls: ['./message-home.component.scss']
})
export class MessageHomeComponent implements OnInit {

  users: any = []
  activeUser = null;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsersExceptMe().subscribe(data => {
      this.users = data;
      this.activeUser = this.users[0]
    })
  }

  setCurrentUser(user){
    console.log(user)
    this.activeUser = user
  }

}
