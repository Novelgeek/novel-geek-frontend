import { Component, OnInit, Input } from '@angular/core';
import { GroupService } from 'app/core/_services/group.service';

@Component({
  selector: 'app-group-horizontal-card',
  templateUrl: './group-horizontal-card.component.html',
  styleUrls: ['./group-horizontal-card.component.scss']
})
export class GroupHorizontalCardComponent implements OnInit {
  @Input() group;
  constructor(private groupService: GroupService) { }

  ngOnInit() {
    console.log(this.group);
  }

  requestMembership() {
    this.groupService.requestMembership(this.group.groupId).subscribe( data=> {
      console.log(data);
    }, error => {
      console.log(error);
    })
  }

}
