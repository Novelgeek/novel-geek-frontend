import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/_services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { GroupService } from 'app/core/_services/group.service';

@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.scss']
})
export class GroupHomeComponent implements OnInit {
  user: any;
  groups: any = [];
  allGroups: any =[];
  groupInvites: any = [];
  constructor(private authSerice: AuthService, private http: HttpClient,
              private modalService: NgbModal, private groupService: GroupService) { }

  ngOnInit() {
    this.groupService.getUserGroups().subscribe( data => {
      this.groups = data;
      console.log(this.groups);
    })
    this.groupService.getAllGroups().subscribe( data => {
      this.allGroups = data;
    })
    this.groupService.getGroupInvites().subscribe( data => {
      this.groupInvites = data;

    })
  }



  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'create-group'}).result.then((result) => {
    }, (reason) => {
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.groupService.createGroup(form.value.groupName, form.value.description, form.value.avatar).subscribe( data => {
      this.groups.push({group: data});
      this.allGroups.push(data);
      console.log(data)
    }, error => {
      console.log(error);
    });
  }

  acceptInvite(groupId) {
    console.log(groupId);
    this.groupService.acceptInvite(groupId).subscribe(data => {
      console.log(data[0].group);
      this.groups.push(data[0]);
      this.groupInvites = this.groupInvites.filter(group => {
        return group.group.groupId !== groupId
      })
    }, error => {
      console.log(error);
    })
  }

}
