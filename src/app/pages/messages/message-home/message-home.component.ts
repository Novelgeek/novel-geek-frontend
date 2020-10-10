import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
  OnDestroy,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  AfterContentChecked,
} from '@angular/core';
import { Chat } from '../../../../../examples/chat/chat.model';
import { UserService } from 'app/core/_services/user.service';
import { ChatService } from 'app/core/_services/chat.service';
import { Subscription } from 'rxjs';
import { element } from 'protractor';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-home',
  templateUrl: './message-home.component.html',
  styleUrls: ['./message-home.component.scss'],
})
export class MessageHomeComponent implements OnInit, OnDestroy {
  users: any = [];
  activeUser = null;
  message: String = '';
  messageHistory: any = [];
  searchTerm = '';
  messageSubscription: Subscription;
  constructor(
    private userService: UserService,
    private chatService: ChatService,
    public datepipe: DatePipe,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}



  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  ngOnInit() {
    this.userService.getAllUsersExceptMe().subscribe((data) => {
      this.users = data;
      this.setCurrentUser(this.users[0]);
      this.route.queryParams.subscribe(params => {
        if (params.user != null ) {
          const current = this.users.find(user => {
            return (user.id == params.user)
          });
          if (current != undefined) {
            this.setCurrentUser(current);
          }
        }
      });
    });

    

  }

  setCurrentUser(user) {
    this.messageHistory = [];
    this.activeUser = user;

    if (this.messageSubscription !== undefined) {
      this.messageSubscription.unsubscribe();
    }
    this.spinner.show()
    this.messageSubscription = this.chatService
      .get(this.activeUser.id)
      .subscribe((data) => {
        this.messageHistory = data;
        this.messageHistory.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : -1
        );
        this.spinner.hide()
      });
  }

  sendMessage() {
    console.log(this.message);
    this.chatService.sendMessage(this.activeUser.id, this.message);
    this.message = '';
  }

  filter() {}
}
