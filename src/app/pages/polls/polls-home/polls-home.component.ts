import { Component, OnInit, Input } from '@angular/core';
import { Poll } from 'app/core/_models/poll.model';
import { PollService } from 'app/core/_services/poll.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-polls-home',
  templateUrl: './polls-home.component.html',
  styleUrls: ['./polls-home.component.scss']
})
export class PollsHomeComponent implements OnInit {

  allpolls: Poll[];
  mypolls: Poll[];


  constructor(
    private pollService: PollService) { 
      this.mypolls=[];
    }

    
  ngOnInit(): void {
   
    this.pollService.getPolls().subscribe(polls => {
      // console.log(polls)
      this.allpolls = polls;
    }, error => {
      console.log(error);
    });

    this.pollService.getPollsForUser().subscribe(polls =>{
      console.log(polls)
      this.mypolls = polls;
    }, error =>{
      console.log(error);
    });
  }

  onDeletePoll(data: {id: number}){
    this.mypolls.splice(data.id, 1);
  }


}
