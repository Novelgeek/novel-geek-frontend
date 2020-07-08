import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auction-process',
  templateUrl: './auction-process.component.html',
  styleUrls: ['./auction-process.component.css']
})
export class AuctionProcessComponent implements OnInit {
  users:any=[1,2,3,4,5]
  constructor() { }

  ngOnInit(): void {
  }

}
