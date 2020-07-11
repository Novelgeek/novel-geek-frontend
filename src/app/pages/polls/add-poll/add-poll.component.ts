import { Component, OnInit } from '@angular/core';
import { Poll } from 'app/core/_models/poll.model';
import { PollService } from 'app/core/_services/poll.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { EROFS } from 'constants';

@Component({
  selector: 'app-add-poll',
  templateUrl: './add-poll.component.html',
  styleUrls: ['./add-poll.component.css']
})
export class AddPollComponent implements OnInit {

  options: string[] = [];
  poll: Poll = {
    id: null,
    title: null,
    endDate: null,
    options: null,
    user: null
  };

  constructor(
    private pollService: PollService,
    private router: Router,
    private toastr: ToastrService, 
    private spinner: NgxSpinnerService) { }
    
  ngOnInit(){
  }

  addOption(option: string) {
    if (option !== undefined && option != null && option !== '') {
      this.options.push(option);
    }
    
  }

  removeOption(optionDel: string) {
    this.options = this.options.filter(option => option !== optionDel);
  }

  onSubmitPollForm(f) {

    this.poll.options = this.options;
    this.poll.endDate = new Date(f.value.endDate).toDateString();
    console.log(this.poll);
    
    this.pollService.savePoll(this.poll).subscribe(success => {
      // this.router.navigate(['']);
      this.toastr.success('Successfully added!');
    }, error => {
      console.log(error);
      this.toastr.error(error);
    });
  }


}
