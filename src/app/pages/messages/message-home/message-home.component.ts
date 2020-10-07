import { Component, OnInit, ElementRef, ViewChild, Renderer2, OnDestroy, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Chat } from '../../../../../examples/chat/chat.model';
import { UserService } from 'app/core/_services/user.service';
import { ChatService } from 'app/core/_services/chat.service';
import { Subscription } from 'rxjs';
import { element } from 'protractor';

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
    this.messageHistory = []
    this.activeUser = user

    if (this.messageSubscription !== undefined) {
      this.messageSubscription.unsubscribe();
    }

    this.messageSubscription = this.chatService.get(this.activeUser.id).subscribe(data => {
      this.messageHistory = data;
      this.messageHistory.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
    })
  }

  sendMessage() {
    console.log(this.message);
    this.chatService.sendMessage(this.activeUser.id, this.message)
    this.message = '';
  }

}
