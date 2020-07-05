import { Component, OnInit,Input } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.css']
})
export class AuctionCardComponent implements OnInit {
  bid: any = '';

  @Input() auctionId: any;
  @Input() bookDescription: any;
  @Input() bookTitle: any;
  @Input() finishDate: any;
  @Input() imageUrl: any;
  @Input() startingBid: any;
  @Input() numberOfBids: any;
  @Input() currentBid: any;
  @Input() user: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
