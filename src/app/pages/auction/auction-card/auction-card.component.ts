import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.css']
})
export class AuctionCardComponent implements OnInit {
  bid:any='';
  constructor() { }

  ngOnInit(): void {
  }

}
