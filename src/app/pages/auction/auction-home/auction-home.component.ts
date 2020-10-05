import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/core/_services/auth.service';
import { AuctionService } from '../auction.service';

@Component({
  selector: 'app-auction-home',
  templateUrl: './auction-home.component.html',
  styleUrls: ['./auction-home.component.css']
})
export class AuctionHomeComponent implements OnInit {
  auctions:any = [];
  create = false;
  
  bookTitle:any='';
  bookDescription:any='';
  startingBid:any='';
  selectedFile:File;
  finishDate:any;



  constructor(private spinner:NgxSpinnerService,private authService:AuthService,
    private auctionService:AuctionService,private toastr:ToastrService) { }
  ngOnInit(): void {
    this.spinner.show();
    this.auctionService.getAuctions().subscribe(data => {
      console.log(data);
      this.spinner.hide();
      this.auctions = data;
      this.auctions.forEach(element => {
        console.log(element.auctionStatus);
      });
      this.filter();


    },
    error=>{
      this.spinner.hide();
      this.toastr.error("Error Occured")
    }
    );
  }
  filter(){
    this.auctions = this.auctions.filter(auc=>{
      return auc.auctionStatus=="ONGOING";
    });
    // this.auctions = this.auctions.filter(auc=>{
    //     const time = new Date(auc.finishDate).getTime() - new Date().getTime();
    //     return this.dhm(time) >= 0;
    // });
  }
  dhm(ms) {
    const days = Math.floor(ms / (24*60*60*1000));
    const daysms=ms % (24*60*60*1000);
    const hours = Math.floor((daysms)/(60*60*1000));
    const hoursms=ms % (60*60*1000);
    const minutes = Math.floor((hoursms)/(60*1000));
    const minutesms=ms % (60*1000);
    const sec = Math.floor((minutesms)/(1000));
    return days;
  }

  onClick(){
    this.create=!this.create;
  }
  public uploadImage(event) {
    this.selectedFile = event.target.files[0]
  }
  onDate(){
    console.log(this.finishDate);
  }

  onSubmit() {
    this.spinner.show();
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('bookTitle', this.bookTitle);
    formData.append('bookDescription', this.bookDescription);
    formData.append('finishDate', this.finishDate);
    formData.append('userId', this.authService.currentUser.id);
    formData.append('startingBid', this.startingBid);

    this.auctionService.addAuction(formData).subscribe(data => {
      console.log(data);
      this.auctions.push(data);
      this.spinner.hide();
      this.bookTitle='';
      this.bookDescription='';
      this.startingBid='';
      this.selectedFile=null;
      this.finishDate='';
      this.toastr.success("New Auction Started Successfully!");
      this.create=false;
    }, error => {
        this.spinner.hide();
        this.toastr.error("Something went wrong!");
    });

  }

}
