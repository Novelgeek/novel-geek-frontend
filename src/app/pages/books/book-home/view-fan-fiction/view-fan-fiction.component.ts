import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FanFictionService } from 'app/core/_services/fan-fiction.service';
import { error } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from '../../../../../../examples/components/extra/toastr/toastr.service';
import { FanFictionComponent } from '../fan-fiction/fan-fiction.component';

@Component({
  selector: 'app-view-fan-fiction',
  templateUrl: './view-fan-fiction.component.html',
  styleUrls: ['./view-fan-fiction.component.css'],
})
export class ViewFanFictionComponent implements OnInit {
  fanfictionList: {
    id: number;
    imageName: string;
    bookName: string;
    title: string;
    description: string;
    fileUrl: string;
    userId: number;
  }[];

  myFanFictions: any = [];
  fanfictionForm;
  currentFanFiction;

  constructor(
    private fanFictionService: FanFictionService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
  ) {

  }

  ngOnInit(): void {
    this.getFanfictions();
    this.getMyFanFictions();
  }

  fanFictionDialog() {
    const dialogRef = this.dialog.open(FanFictionComponent, {
      autoFocus: false,
      width: '2000px',
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getFanfictions();
      this.getMyFanFictions();
    });
  }

  getFanfictions() {
    this.fanFictionService.getAll().subscribe(
      (res) => {
        console.log(res);
        this.fanfictionList = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getMyFanFictions() {
    this.fanFictionService.getFanFictionsByUserid().subscribe(
      (res) => {
        console.log(res);
        this.myFanFictions = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete(id) {
    console.log(id);
    this.fanFictionService.deleteFanFiction(id).subscribe(
      (res) => {
        console.log(res);
        this.myFanFictions = this.myFanFictions.filter((item) => {
          return item.id !== id;
        });
        this.fanfictionList = this.fanfictionList.filter((item) => {
          return item.id !== id;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  open(content, fanFiction) {
    this.currentFanFiction = fanFiction;
    this.modalService.open(content, {ariaLabelledBy: 'editFiction'}).result.then((result) => {
    }, (reason) => {
    });
  }

  close() {
    this.modalService.dismissAll()
  }


  editFanFiction() {
    const formData = new FormData();
    formData.append('bookName', this.currentFanFiction.bookName);
    formData.append('title', this.currentFanFiction.title);
    formData.append('description', this.currentFanFiction.description);
    formData.append('id', this.currentFanFiction.id);
    console.log(formData);

    this.spinner.show();
    this.fanFictionService.editFanFiction(formData).subscribe(
      (res) => {
        console.log('sucess fully add');
        this.spinner.hide();
        this.modalService.dismissAll()
        this.getFanfictions();
      this.getMyFanFictions();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
        this.modalService.dismissAll()
      }
    );
  }
}
