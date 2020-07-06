import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/_services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { GroupService } from 'app/core/_services/group.service';
import { group } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
  selectedFile: File;

  constructor(private authSerice: AuthService, private http: HttpClient,
              private modalService: NgbModal, private groupService: GroupService,
              private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.groupService.getAllGroups().subscribe( data => {
      this.allGroups = data;
      this.myGroups = data;
      this.myGroups = this.myGroups.filter( group => {
        return group.member;
      })
      this.spinner.hide()
    }, error => {
      this.spinner.hide();
      this.toastr.error(error);
    })
    this.spinner.show();
    this.groupService.getGroupInvites().subscribe( data => {
      this.spinner.hide();
      this.groupInvites = data;
    }, error => {
      this.spinner.hide();
      this.toastr.error(error);
    })
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'create-group'}).result.then((result) => {
    }, (reason) => {
    });
  }

  onSubmit(form: NgForm) {
    this.spinner.show();
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('groupName', form.value.groupName);
    formData.append('description', form.value.description);
    this.groupService.createGroup(formData).subscribe( data => {
      this.myGroups.push(data);
      this.allGroups.push(data);
      this.modalService.dismissAll();
      this.spinner.hide();
      this.toastr.success('Group Created Successfully')
    }, error => {
      this.toastr.error(error);
      this.spinner.show();
    });
  }

  acceptInvite(inviteId) {
    this.spinner.show();
    this.groupService.acceptInvite(inviteId).subscribe(data => {
      this.myGroups.push(data);
      this.groupInvites = this.groupInvites.filter(invite => {
        return invite.notificationId !== inviteId
      })
      this.spinner.hide();
      this.toastr.success('Joined Group' + data.groupName)
    }, error => {
      this.toastr.error(error);
      this.spinner.show();
    })
  }



}
