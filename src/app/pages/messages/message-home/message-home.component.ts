import { Component, OnInit, ElementRef, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { Chat } from '../../../../../examples/chat/chat.model';
import { UserService } from 'app/core/_services/user.service';
import { ChatService } from 'app/core/_services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-home',
  templateUrl: './message-home.component.html',
  styleUrls: ['./message-home.component.scss']
})
export class MessageHomeComponent implements OnInit, OnDestroy {

  users: any = []
  activeUser = null;
  message: String = '';
  messageHistory: any = [];

  incoming: any = [];
  outgoing: any = [];

  messageSubscription: Subscription;

  constructor(private userService: UserService, private chatService: ChatService) { }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  ngOnInit() {
    this.userService.getAllUsersExceptMe().subscribe(data => {
      this.users = data;
      this.setCurrentUser(this.users[0]);
    })


  }

  setCurrentUser(user) {
    console.log(user)
    this.activeUser = user
    if (this.messageSubscription !== undefined) {
      this.messageSubscription.unsubscribe();
    }

    this.messageSubscription = this.chatService.get(this.activeUser.id).subscribe(data => {
      this.messageHistory = data;
      this.outgoing = this.messageHistory.filter(message => message.to === this.activeUser.id)
      this.incoming = this.messageHistory.filter(message => message.to !== this.activeUser.id)
      console.log(data)
    })
  }

  sendMessage() {
    console.log(this.message);
    this.chatService.sendMessage(this.activeUser.id, this.message)
    this.message = '';
  }

}
