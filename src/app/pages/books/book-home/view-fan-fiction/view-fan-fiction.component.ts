import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FanFictionService } from 'app/core/_services/fan-fiction.service';
import { error } from 'console';
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

  constructor(private fanFictionService: FanFictionService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getFanfictions();
    this.getMyFanFictions();
  }

  fanFictionDialog() {
    const dialogRef = this.dialog.open(FanFictionComponent, {
      autoFocus: false,
      width: '2000px',maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
