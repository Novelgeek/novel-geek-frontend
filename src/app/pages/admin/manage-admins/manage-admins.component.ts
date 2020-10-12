import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { NgForm } from '@angular/forms';
import { AdminService } from 'app/core/_services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.scss']
})
export class ManageAdminsComponent implements OnInit {
  email: string;
  password: string;
  username: string;
  admins: any = [];
  constructor(private modalService: NgbModal, private toastr: ToastrService,
              private spinner: NgxSpinnerService, private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllAdmins().subscribe(data => {
      this.admins = data;
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'create-group'}).result.then((result) => {
    }, (reason) => {
    });
  }

  onSubmit(form: NgForm) {
    this.spinner.show();

    this.adminService.addAdmin(form.value.username, form.value.email, form.value.password).subscribe( data => {
      this.admins.push(data);
      this.modalService.dismissAll();
      this.spinner.hide();
      this.toastr.success('Admin Added Successfully')
    }, error => {
      this.toastr.error(error);
      this.spinner.show();
    });
  }

  deleteAdmin(adminId){
    this.adminService.deleteAdmin(adminId).subscribe(data => {
      this.toastr.success('Admin Deleted')
      this.admins = this.admins.filter(admin => admin.id != adminId)
    }, error => {
      this.toastr.error(error.error)
    })
  }

}
