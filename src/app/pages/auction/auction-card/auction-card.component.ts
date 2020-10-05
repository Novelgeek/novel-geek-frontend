import { Component, OnInit,Input } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { AuctionService } from '../auction.service';
import { AuthService } from 'app/core/_services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.css']
})
export class AuctionCardComponent implements OnInit {
  bid: any = '';
  remainingTime='';
  @Input() auctionId: any;
  @Input() bookDescription: any;
  @Input() bookTitle: any;
  @Input() finishDate: any;
  @Input() imageUrl: any;
  @Input() startingBid: any;
  @Input() numberOfBids: any;
  @Input() currentBid: any;
  @Input() user: any = [];
  ownUser=false;

  auction:any=[];

  constructor(private spinner:NgxSpinnerService,private toastr:ToastrService,
    private auctionService: AuctionService,private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
    if (this.imageUrl == null){
      this.imageUrl = '../../../../assets/books/default-book.png';
    }
    if(this.user.id==this.authService.currentUser.id){
      this.ownUser=true;
    }
    const time = new Date(this.finishDate).getTime() - new Date().getTime();
    this.remainingTime = this.dhm(time);
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

  onAddBid(){
    if (this.bid != ''){
      this.spinner.show();
      const newBid = <Number>this.bid;
      const curBid = <Number>this.currentBid;
      if(newBid > curBid){
        const newBidData = {
          newBid : this.bid,
          auctionId : this.auctionId,
          userId : this.authService.currentUser.id
        }
        this.auctionService.addNewBid(newBidData).subscribe(data => {
          this.auction= data ;
          this.currentBid=this.auction.currentBid;
          this.numberOfBids=this.auction.numberOfBids;
          this.bid='';
          this.spinner.hide();
          this.toastr.success("Bid Successful");
        },
        error => {
          this.spinner.hide();
          this.toastr.error("Something went wrong")
          console.log(error);
        }
        );
      }else{
        this.spinner.hide();
        this.toastr.error("Please add a higher bid than the current bid")
      }
    }
  }

  onProcess(){
    console.log("process")
    this.router.navigate(['/auctions/process'], {queryParams: {auctionId: this.auctionId} });

  }
  onDelete(){

  }

}
