import { Component, OnInit, Input } from '@angular/core';
import {AuctionService} from '../../auction.service';

@Component({
  selector: 'app-bidder-card',
  templateUrl: './bidder-card.component.html',
  styleUrls: ['./bidder-card.component.css']
})
export class BidderCardComponent implements OnInit {

  @Input() bidder: any = [];
  @Input() highestBidder: any;
  @Input() auctionId: any;
  isBidder = false;
  constructor(private auctionService: AuctionService) { }

  ngOnInit(): void {
    console.log(this.bidder);
    if (this.bidder.bidUser.id == this.highestBidder){
      this.isBidder = true;
    } else {
      this.isBidder = false;
    }
  }
  makeSale() {
    const sale = {
      'auctionId': this.auctionId,
      'bidderId': this.bidder.bidUser.id
    };
    this.auctionService.makeSale(sale).subscribe(data => {
      console.log(data);
    },
    error => {
      console.log(error)
    });
  }

}
