import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-bidder-card',
  templateUrl: './bidder-card.component.html',
  styleUrls: ['./bidder-card.component.css']
})
export class BidderCardComponent implements OnInit {

  @Input() bidder: any = [];
  @Input() highestBidder: any;
  isBidder = false;
  constructor() { }

  ngOnInit(): void {
    if(this.bidder.bidUser.id==this.highestBidder){
      this.isBidder = true;
    }else{
      this.isBidder = false;
    }
  }

}
