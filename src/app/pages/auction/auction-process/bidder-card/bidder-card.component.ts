import { Component, OnInit, Input } from '@angular/core';
import {AuctionService} from '../../auction.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private auctionService: AuctionService, private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.bidder);
    if (this.bidder.bidUser.id == this.highestBidder){
      this.isBidder = true;
    } else {
      this.isBidder = false;
    }
  }
  makeSale() {
    this.spinner.show();
    const sale = {
      'auctionId': this.auctionId,
      'bidderId': this.bidder.bidUser.id
    };
    this.auctionService.makeSale(sale).subscribe(data => {
      this.spinner.hide();
      console.log(data);
      this.toastr.success("Sold to "+this.bidder.bidUser.username);

    },
    error => {
      this.spinner.hide();
      this.toastr.error("Something Went Wrong");
      console.log(error)
    });
  }

}
