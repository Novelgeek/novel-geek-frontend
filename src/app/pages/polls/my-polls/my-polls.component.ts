import { Component, OnInit } from '@angular/core';
import { PollService } from 'app/core/_services/poll.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Poll } from 'app/core/_models/poll.model';
import { AuthService } from 'app/core/_services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.css']
})
export class MyPollsComponent implements OnInit {

  constructor(private pollService: PollService,
    private authService: AuthService,
    private toastr: ToastrService, 
    private spinner: NgxSpinnerService
    ) { }

    polls: Poll[] = [];

  // private userSub: Subscription;
  public user: any;
  isAuthenticated = false;
  url: any;
  userId: number;

  ngOnInit(): void {
    // this.userSub = this.authService.user.subscribe( user => {
    //   this.isAuthenticated = !!user; // !user ? false : true
    //   this.user = user;
    // });
    this.loadMyPolls();
  }


  deletePoll(id) {
    this.pollService.deletePoll(id)
      .subscribe(success => {
        this.loadMyPolls();
      }, error => {
        console.log(error);
      });
  }

  loadMyPolls() {
    // let userId = this.authService.currentUser.id;
    this.pollService.getPollsForUser().subscribe(polls => {
      this.polls = polls;
    }, error => {
      console.log(error);
    });
  }

}
