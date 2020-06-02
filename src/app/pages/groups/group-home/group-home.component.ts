import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/_services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { GroupService } from 'app/core/_services/group.service';
import { group } from '@angular/animations';

@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.scss']
})
export class GroupHomeComponent implements OnInit {
  user: any;
  myGroups: any = [];
  allGroups: any = [];
  groupInvites: any = [];
  constructor(private authSerice: AuthService, private http: HttpClient,
              private modalService: NgbModal, private groupService: GroupService) { }

  ngOnInit() {
    this.groupService.getAllGroups().subscribe( data => {
      this.allGroups = data;
      this.myGroups = data;
      this.myGroups = this.myGroups.filter( group => {
        return group.member;
      })
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
    this.groupService.createGroup(form.value.groupName, form.value.description, form.value.avatar).subscribe( data => {
      this.myGroups.push(data);
      this.allGroups.push(data);
      this.modalService.dismissAll();
    }, error => {
      console.log(error);
    });
  }

  acceptInvite(inviteId) {
    this.groupService.acceptInvite(inviteId).subscribe(data => {
      this.myGroups.push(data);
      this.groupInvites = this.groupInvites.filter(invite => {
        return invite.notificationId !== inviteId
      })
    }, error => {
      console.log(error);
    })
  }

}
