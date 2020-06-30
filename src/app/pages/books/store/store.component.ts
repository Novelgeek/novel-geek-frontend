import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from './chat.service';
import { Chat } from './chat.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {



  chat: Chat[];
  activeChatUser: string;
  activeChatUserImg: string;
  @ViewChild('messageInput', {static: false}) messageInputRef: ElementRef;

  messages = new Array();
  item: number = 0;
  constructor() {
  }

  ngOnInit() {
    // $.getScript('./assets/js/chat.js');
  }

  //send button function calls
  onAddMessage() {
    if (this.messageInputRef.nativeElement.value != "") {
      console.log(this.messageInputRef.nativeElement.value);
    }
  }

  //chat user list click event function
  SetActive(event, chatId: string) {
    
  }

  onSidebarToggle() {
  }

  onContentOverlay() {

  }


}
