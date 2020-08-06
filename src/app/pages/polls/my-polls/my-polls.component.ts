import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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

    @Input() poll: any;
    @Output() ondelete  = new EventEmitter ();
    isShow:boolean = false;
 
    ngOnInit(): void {
        //this.loadMyPolls();
        console.log(this.poll.pollid);
        console.log(this.poll);
    }


  deletePoll() {
    this.spinner.show()
    this.pollService.deletePoll(this.poll.pollid)
      .subscribe(success => {
        this.isShow = false;
        this.ondelete.emit({id: this.poll.pollid});
        this.toastr.success('poll deleted!');
        this.spinner.hide()
      }, error => {
        console.log(error);
      });
  }

  

  loadMyPolls() {
    // let userId = this.authService.currentUser.id;
    this.pollService.getPollsForUser().subscribe(polls => {
      this.poll = polls;
    }, error => {
      console.log(error);
    });
  }

  public toggleList() {
    this.isShow = !this.isShow;
  }

}
