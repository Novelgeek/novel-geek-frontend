import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FanFictionService } from 'app/core/_services/fan-fiction.service';
import { error } from 'console';

@Component({
  selector: 'app-view-fan-fiction',
  templateUrl: './view-fan-fiction.component.html',
  styleUrls: ['./view-fan-fiction.component.css']
})
export class ViewFanFictionComponent implements OnInit {
  fanfictionList: 
  {id: number; imageName: string; bookName: string; title: string; description: string; fileUrl:string; userId:number }[];



  constructor(private fanFictionService: FanFictionService,
  public dialogRef: MatDialogRef<ViewFanFictionComponent>){ }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.fanfictionList = [
      {id: 1, imageName: 'Hydrogen bk 1', bookName: 'book name 1', title: 'titil 1', description: 'test des 1', fileUrl:'file url 1', userId:1 },
      {id: 2, imageName: 'Hydrogen bk 2', bookName: 'book name 2', title: 'H', description: 'test des 2', fileUrl:'file url 2', userId:2 },
      {id: 3, imageName: 'Hydrogen bk 3', bookName: 'book name 3', title: 'H', description: 'test des 3', fileUrl:'file url 3', userId:3 },
      {id: 4, imageName: 'Hydrogen bk 4', bookName: 'book name 4', title: 'H', description: 'test des 4', fileUrl:'file url 4', userId:3 },
      {id: 5, imageName: 'Hydrogen bk 5', bookName: 'book name 5', title: 'H', description: 'test des 5', fileUrl:'file url 5', userId:3 }
    
    ];  
    this.getFanfictions();
  }

  getFanfictions() {
    this.fanFictionService.getFanFictionsByUserid().subscribe(res => {
      console.log(res);
      this.fanfictionList = res;
    },error=> {console.log(error)}
    );
  }

  

  close() {
    this.dialogRef.close();
  }

  delete(id) {
    console.log(id);
    this.fanFictionService.deleteFanFiction(id).subscribe( res => {
      console.log(res);
    }, error => {console.log(error)}
    );
  } 

}
