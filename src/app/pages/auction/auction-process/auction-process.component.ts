import { Component, OnInit } from '@angular/core';
import {BidderCardComponent} from './bidder-card/bidder-card.component'
import { ActivatedRoute } from '@angular/router';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuctionService } from '../auction.service';

@Component({
  selector: 'app-auction-process',
  templateUrl: './auction-process.component.html',
  styleUrls: ['./auction-process.component.css']
})
export class AuctionProcessComponent implements OnInit {
  users: any = [1, 2, 3, 4, 5];
  data: any = [];
  remainingTime: any;
  auctionId: any;
  bidders: any = [];
  highestBidder: any;

  constructor(private auctionService:AuctionService,private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.queryParams.subscribe(params =>{
      this.auctionId = params.auctionId;
      this.load();
      this.spinner.hide();
    },
    error => {
      this.spinner.hide();
      console.log(error);
    }
    );
  }

  load(){
    this.auctionService.getAuctionData(this.auctionId).subscribe(data =>{
      console.log(data);
      this.data = data;
      
      const time = new Date(this.data.finishDate).getTime() - new Date().getTime();
      this.remainingTime = this.dhm(time);

      this.bidders = this.data.auctionUserHitory;
      this.filter();
      this.highestBidder = this.data.currentBidUser.id;

    },
    error => {
      console.log(error);
    }
    );
  }

  dhm(ms) {
    const days = Math.floor(ms / (24*60*60*1000));
    const daysms=ms % (24*60*60*1000);
    const hours = Math.floor((daysms)/(60*60*1000));
    const hoursms=ms % (60*60*1000);
    const minutes = Math.floor((hoursms)/(60*1000));
    const minutesms=ms % (60*1000);
    const sec = Math.floor((minutesms)/(1000));
    return days+" days and "+hours+" hours";
  }

  filter(){
    let resArr = [];
    this.bidders.forEach(item => {

      let i = resArr.findIndex(x => x.bidUser.id == item.bidUser.id);
      console.log(i);
      if(i <= -1){
        resArr.push(item);
      }
    });
    this.bidders = resArr;
  }
}
