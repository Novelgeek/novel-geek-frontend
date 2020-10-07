import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FanFictionService } from 'app/core/_services/fan-fiction.service';
import { error } from 'console';

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


  constructor(private fanFictionService: FanFictionService) {}

  ngOnInit(): void {
    this.getFanfictions();
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
