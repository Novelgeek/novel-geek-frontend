import { Component, OnInit, Input } from '@angular/core';
import { GroupService } from 'app/core/_services/group.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-group-horizontal-card',
  templateUrl: './group-horizontal-card.component.html',
  styleUrls: ['./group-horizontal-card.component.scss']
})
export class GroupHorizontalCardComponent implements OnInit {
  @Input() group;
  constructor(private groupService: GroupService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    console.log(this.group);
  }

  requestMembership() {
    this.spinner.show();
    this.groupService.requestMembership(this.group.groupId).subscribe( data => {
      this.toastr.success('Request sent successfully')
      this.spinner.hide();
    }, error => {
      this.toastr.error('Unable to send request at the moment')
      this.spinner.hide();
    })
  }

}
