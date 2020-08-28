import { Component, OnInit, Input } from '@angular/core';
import { Poll } from 'app/core/_models/poll.model';
import { PollService } from 'app/core/_services/poll.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-poll-model',
  templateUrl: './poll-model.component.html',
  styleUrls: ['./poll-model.component.css']
})
export class PollModelComponent implements OnInit {

  @Input() poll: any;
  selected: number;
  votingEnded = false;

  constructor(
    private pollService: PollService,
    private toastr: ToastrService, 
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    const now = new Date();

    if (new Date(this.poll.endDate).getTime() < now.getTime()) {
      this.votingEnded = true;
    }
  }

  vote() {
    // this.spinner.show();
    this.pollService.vote(this.poll.pollid, this.selected).subscribe(success => {
      console.log(this.selected);
      this.poll.voted = true;
      // this.spinner.hide();
      this.toastr.success('Vote submitted!');
    }, error => {
      console.log(error);
      this.toastr.success('You can\'t vote twise!');
      // this.spinner.hide();
    });
  }
}
