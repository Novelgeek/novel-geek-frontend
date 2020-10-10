import { Component, OnInit, Input } from '@angular/core';
import { Poll } from 'app/core/_models/poll.model';
import { PollService } from 'app/core/_services/poll.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ConsoleService } from '@ng-select/ng-select/lib/console.service';



@Component({
  selector: 'app-poll-model',
  templateUrl: './poll-model.component.html',
  styleUrls: ['./poll-model.component.css']
})


export class PollModelComponent implements OnInit {

  @Input() poll: any;
  selected: number;
  votingEnded = false;
  showResults = false;
  totalvotes: number =0

  options = []

  constructor(
    private pollService: PollService,
    private toastr: ToastrService, 
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) { }

    colorScheme = {
      domain: ['success', 'info', 'warning', 'dangers']
    };

  ngOnInit() {
    const now = new Date();

    if (new Date(this.poll.endDate).getTime() < now.getTime()) {
      this.votingEnded = true;
      
    }

    //

    this.poll.options.forEach(option => {
      this.options.push({
        'name': option.option,
        'value': option.score
      })
    })
    console.log(this.options)

    //get total score of the votes
    this.poll.options.forEach(option => {
      this.totalvotes+=option.score
    });
    console.log(this.totalvotes)


    
  }

  vote() {

    // this.spinner.show();
    this.pollService.vote(this.poll.pollid, this.selected).subscribe(success => {
      console.log(this.selected);
      this.poll.voted = true;
      // this.spinner.hide();
      this.pollService.getPoll(this.poll.pollid).subscribe(data => {
        console.log(data)
        this.poll= data
        this.options = []
        this.poll.options.forEach(option => {
          this.options.push({
            'name': option.option,
            'value': option.score
          })
        })
        console.log(this.options)
      })
      this.toastr.success('Vote submitted!');
    }, error => {
      console.log(error);
      this.toastr.success('You can\'t vote twise!');
      // this.spinner.hide();
    });
  }

  // options[] = [[option,count]]

  toggleResults() {
    console.log(this.showResults);
    this.showResults = !this.showResults
  }
}
